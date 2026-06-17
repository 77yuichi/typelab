import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Self Discovery",
  description: "A lightweight self-discovery MVP for tarot-inspired love tests."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
