import { Toaster } from "sonner";
import App from "@/app/components/App";
import HeaderDesktop from "@/app/components/Header";
import Aside from "@/app/components/AsideRight";
import AsideLeft from "@/app/components/AsideLeft";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Toaster position="top-right" expand={false} richColors />
      <HeaderDesktop />
      <div id="portal-root"></div>
      <div className="grid grid-cols-[auto_1fr_auto]">
        <Aside />
        <main>{children}</main>
        <AsideLeft />
      </div>
    </App>
  )
}