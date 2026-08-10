"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaRegister() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateReady, setUpdateReady] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let hadController = Boolean(navigator.serviceWorker.controller);
    let refreshing = false;
    const showUpdate = (nextRegistration: ServiceWorkerRegistration) => {
      if (nextRegistration.waiting && hadController) {
        setRegistration(nextRegistration);
        setUpdateReady(true);
      }
    };
    const onControllerChange = () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    navigator.serviceWorker.register("/service-worker.js", { scope: "/" }).then((nextRegistration) => {
      showUpdate(nextRegistration);
      nextRegistration.addEventListener("updatefound", () => {
        const worker = nextRegistration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed") showUpdate(nextRegistration);
        });
      });
      nextRegistration.update().catch(() => undefined);
    }).catch(() => undefined);
    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => undefined);
    setInstallPrompt(null);
  };

  const update = () => {
    registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
    setUpdateReady(false);
  };

  if (!updateReady && !installPrompt) return null;
  return (
    <div className="pwa-actions" role="status" aria-live="polite">
      {updateReady ? <button className="pwa-action" type="button" onClick={update}>Mettre Game Note à jour</button> : null}
      {installPrompt ? <button className="pwa-action pwa-action-secondary" type="button" onClick={install}>Installer Game Note</button> : null}
    </div>
  );
}
