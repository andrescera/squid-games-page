import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Squid Games Colombia Minecraft - Evento de Supervivencia Épico",
  description: "145+ streamers compitiendo en los juegos más mortales de Minecraft. Descarga el mod y únete al evento de supervivencia más épico.",
  keywords: ["Squid Games Colombia", "Minecraft", "Mod", "Streaming", "Kick", "Gaming", "Survival", "Colombia"],
  authors: [{ name: "Squid Games Colombia" }],
  openGraph: {
    title: "Squid Games Colombia Minecraft",
    description: "145+ streamers compitiendo en los juegos más mortales de Minecraft",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squid Games Colombia Minecraft",
    description: "145+ streamers compitiendo en el evento más épico de Minecraft",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}