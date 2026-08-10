import type { Metadata } from "next";
import "./globals.css";
import PwaRegister from "./pwa-register";

export const metadata: Metadata = {
  title: "Game Note — guides chronologiques sans spoiler",
  description:
    "Des soluces chronologiques pour jouer sans rater les succès, quêtes et collectibles.",
  applicationName: "Game Note",
  authors: [{ name: "Game Note" }],
  keywords: ["guides jeux video", "succes Steam", "soluces", "sans spoiler"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://game-note.pages.dev"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Game Note",
    description: "Des soluces chronologiques pour jouer sans rater les succes, quetes et collectibles.",
    type: "website",
    url: "/",
    siteName: "Game Note",
  },
  twitter: {
    card: "summary",
    title: "Game Note",
    description: "Des soluces chronologiques pour jouer sans rater les succes, quetes et collectibles.",
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
