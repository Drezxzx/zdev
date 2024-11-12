"use client"
import { Toaster } from "sonner";
import App from "../components/App";
import AsideLeft from '@/app/components/AsideLeft'
import HeaderDesktop from "../components/Header";
import Aside from "@/app/components/AsideRight";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <div id="portal-root"></div>
      <Toaster 
      position="top-right" 
      style={{ backgroundColor: "#1B2730", color: "#C7D6E6" }} 
      expand={false} 
      duration={2000} 
      richColors 
    />

      <HeaderDesktop/>
      <div className="grid grid-cols-[auto_1fr_auto]">
        <Aside />
        <main>{children}</main>
        <AsideLeft />
      </div>
    </App>
  );
}
