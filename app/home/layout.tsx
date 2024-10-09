import { Toaster } from "sonner";
import App from "../components/App";
import HeaderDesktop from "../components/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();



export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <App>
        <HeaderDesktop/>
      <Toaster position="top-right" expand={false} richColors/>
        {children}
      </App>
    )
}