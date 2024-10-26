import { Toaster } from "sonner";
import App from "@/app/components/App";
import HeaderDesktop from "@/app/components/Header";
import Aside from "@/app/components/Aside";



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Toaster position="top-right" expand={false} richColors />
      <HeaderDesktop />
      <Aside />
      {children}
    </App>
  )
}