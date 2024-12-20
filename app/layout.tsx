import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zdev - la red social de programadores",
  description: "ZDEV es la red social diseñada especialmente para programadores, donde el conocimiento y la creatividad tecnológica se encuentran.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}   
        <Analytics/>
      </body>
    </html>
  );
}
