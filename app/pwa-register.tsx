"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let hadController = Boolean(navigator.serviceWorker.controller);
    let refreshing = false;
    const activateUpdate = (nextRegistration: ServiceWorkerRegistration) => {
      if (nextRegistration.waiting && hadController) {
        nextRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
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
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    navigator.serviceWorker.register("/service-worker.js", { scope: "/" }).then((nextRegistration) => {
      activateUpdate(nextRegistration);
      nextRegistration.addEventListener("updatefound", () => {
        const worker = nextRegistration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed") activateUpdate(nextRegistration);
        });
      });
      nextRegistration.update().catch(() => undefined);
    }).catch(() => undefined);
    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return null;
}
