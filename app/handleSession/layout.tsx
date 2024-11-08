import { Toaster } from "sonner";
import App from "../components/App";
import HeaderDesktop from "../components/Header";



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Toaster position="top-right" expand={false} duration={2000} richColors />
      {children}
    </App>
  )
}