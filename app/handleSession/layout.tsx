import { Toaster } from "sonner";
import App from "../components/App";
import HeaderDesktop from "../components/Header";



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <Toaster 
      position="top-right" 
      style={{ backgroundColor: "#1B2730", color: "#C7D6E6" }} 
      expand={false} 
      closeButton
      duration={2000} 
      richColors 
    />

      {children}
    </App>
  )
}