"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProgressBootstrap, ModuleCompletionWatcher } from "@/components/shared/progress-bootstrap";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false } },
  }));

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline support is best-effort */
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBootstrap />
      <ModuleCompletionWatcher />
      {children}
    </QueryClientProvider>
  );
}
