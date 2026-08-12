import type { Metadata } from "next";
import "./globals.css";
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
    images: [{ url: "/og.png", alt: "Game Note — une partie, une route, pas un oubli" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Note — une partie, une route, pas un oubli",
    description: "Le carnet de route sans spoiler pour avancer dans le bon ordre.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
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
