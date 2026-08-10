import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Note — guides chronologiques sans spoiler",
  description:
    "Des soluces chronologiques pour jouer sans rater les succès, quêtes et collectibles.",
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
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
