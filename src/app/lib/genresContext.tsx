"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GenresContext = createContext([]);

export function GenresProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("/api/genres");
        if (res.ok) {
          const data = await res.json();
          setGenres(data.genres || []);
        }
      } catch {}
      fetchGenres();
    }
    [];
  });

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
