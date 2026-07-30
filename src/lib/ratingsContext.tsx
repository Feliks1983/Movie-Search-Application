"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useGuest } from "./guestSession";

type RatingsMap = Record<number, number>;
type RatedMovie = {
  id: number;
  rating?: number;
}

const RatingsContext = createContext<{
  ratings: RatingsMap;
  setRating: (movieId: number, value: number) => void;
}>({
  ratings: {},
  setRating: () => {},
});

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const guestSessionId = useGuest();
  const [ratings, setRatings] = useState<RatingsMap>({});

  useEffect(() => {
    if (!guestSessionId) return;

    async function fetchRatings() {
      try {
        const res = await fetch(
          `/api/rated?guest_session_id=${guestSessionId}&page=1`,
        );
        if (!res.ok) return;
        const data = await res.json();
        const map: RatingsMap = {};
        const results: RatedMovie[] = data.results || [];
        (results || []).forEach((movie) => {
          if (movie.rating !== undefined) {
            map[movie.id] = movie.rating;
          }
        });
        setRatings(map);
      } catch {
      }
    }
    fetchRatings();
  }, [guestSessionId]);

  const setRating = useCallback((movieId: number, value: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: value }));
  }, []);

  return (
    <RatingsContext.Provider value={{ ratings, setRating }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatings() {
  return useContext(RatingsContext);
}
