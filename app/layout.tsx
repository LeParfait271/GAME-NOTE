import type { Metadata } from "next";
import "./globals.css";
import "./terminal-pass-three.css";
import "./terminal-pass-four.css";
import "./terminal-pass-five.css";
import PwaRegister from "./pwa-register";

export const metadata: Metadata = {
  title: "Game Note — une partie, une route, pas un oubli",
  description:
    "Le carnet de route Game Note : des guides chronologiques, sans spoiler, pour garder le bon repère au bon moment.",
  applicationName: "Game Note",
  authors: [{ name: "Game Note" }],
  keywords: ["guides jeux video", "succes Steam", "soluces", "sans spoiler"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://game-note.pages.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Game Note — une partie, une route, pas un oubli",
    description: "Le carnet de route sans spoiler pour avancer dans le bon ordre.",
    type: "website",
    url: "/",
    siteName: "Game Note",
    images: [
      { url: "/images/social/game-note-og-dark.png", alt: "Game Note — une partie, une route, pas un oubli" },
      { url: "/og.png", alt: "Game Note — une partie, une route, pas un oubli" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Note — une partie, une route, pas un oubli",
    description: "Le carnet de route sans spoiler pour avancer dans le bon ordre.",
    images: ["/images/social/game-note-og-dark.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/icons/game-note-app-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/images/icons/game-note-app-icon-192.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
