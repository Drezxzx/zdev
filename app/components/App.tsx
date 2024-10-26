"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopLanguajes from "./TopLanguajes";
const queryClient = new QueryClient();

export default function App({ children }: React.PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}
