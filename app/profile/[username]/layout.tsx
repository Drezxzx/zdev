import { Toaster } from "sonner";
import App from "@/app/components/App";
import HeaderDesktop from "@/app/components/Header";



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Toaster position="top-right" expand={true} richColors />
      {children}
    </App>
  )
}