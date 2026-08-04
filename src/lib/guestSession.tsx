"use client";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext<{
  guest: string | null;
  loading: boolean;
  error: string | null;
}>({
  guest: null,
  loading: true,
  error: null,
});

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  const normal = expiresAt.replace(" UTC", "Z").replace(" ", "T");
  const expiryTime = new Date(normal).getTime();
  if (Number.isNaN(expiryTime)) return true;
  return Date.now() >= expiryTime;
}

export function GuestProvider({ children }: { children: React.ReactNode }) {
  const [guest, setGuest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const storedId = localStorage.getItem("guest_session_id");
      const storedExpires = localStorage.getItem("guest_session_expires");
      let id = storedId;
      if (!id || isExpired(storedExpires)) {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch("/api/guest_session");
          if (res.ok) {
            const data = await res.json();
            id = data.guest_session_id;
            if (id) {
              localStorage.setItem("guest_session_id", id);
              if (data.expires_at) {
                localStorage.setItem("guest_session_expires", data.expires_at);
              }
            }
          }
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to load guest session";
          console.error("GuestProvider fetch error:", message);
          setError(message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
      setGuest(id);
    }
    init();
  }, []);

  return (
    <context.Provider value={{ guest, loading, error }}>
      {children}
    </context.Provider>
  );
}

export function useGuest() {
  return useContext(context);
}
