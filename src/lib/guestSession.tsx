"use client";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext<string | null>(null);

export function GuestProvider({ children }: { children: React.ReactNode }) {
  const [guest, setGuest] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      let id = localStorage.getItem("guest_session_id");
      if (!id) {
        try {
          const res = await fetch("/api/guest_session");
          if (res.ok) {
            const data = await res.json();
            id = data.guest_session_id;
            if (id) localStorage.setItem("guest_session_id", id);
          }
        } catch {}
      }
      setGuest(id);
    }
    init();
  }, []);

  return <context.Provider value={guest}>{children}</context.Provider>;
}

export function useGuest() {
  return useContext(context);
}
