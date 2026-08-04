"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Genre = { id: number; name: string };

const GenresContext = createContext<{
  genres: Genre[];
  loading: boolean;
  error: string | null;
}>({
  genres: [],
  loading: true,
  error: null,
});


export function GenresProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/genres");
        if (res.ok) {
          const data = await res.json();
          setGenres(data.genres || []);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load genres";
        console.error("GenresProvider fetch error:", message);
        setError(message);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  return (
    <GenresContext.Provider value={{ genres, loading, error }}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
