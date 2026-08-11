import type { Metadata } from "next";
import "./globals.css";
import PwaRegister from "./pwa-register";

export const metadata: Metadata = {
  title: "Game Note — le bon chemin, sans rien rater",
  description:
    "Des guides de progression chronologiques pour jouer sans spoiler et ne rien rater.",
  applicationName: "Game Note",
  authors: [{ name: "Game Note" }],
  keywords: ["guides jeux video", "succes Steam", "soluces", "sans spoiler"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://game-note.pages.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Game Note",
    description: "Des guides de progression chronologiques pour jouer sans spoiler et ne rien rater.",
    type: "website",
    url: "/",
    siteName: "Game Note",
  },
  twitter: {
    card: "summary",
    title: "Game Note",
    description: "Des guides de progression chronologiques pour jouer sans spoiler et ne rien rater.",
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
