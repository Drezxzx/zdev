import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zdev",
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
      </body>
    </html>
  );
}
