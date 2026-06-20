"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/store/use-progress-store";

/** True after Zustand persist has rehydrated from localStorage (client-only). */
export function useStoreHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const store = useProgressStore.persist;
    if (store.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return store.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
