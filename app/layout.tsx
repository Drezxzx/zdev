import type { Metadata } from "next";
import App from "./components/App";
import HeaderDesktop from "./components/Header";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZDEV",
  description: "A social network for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <App>
        <Toaster position="top-right" expand={true} richColors/>
          {children}
        </App>
         
      </body>
    </html>
  );
}
