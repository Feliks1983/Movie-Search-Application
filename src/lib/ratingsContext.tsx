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
};

const RatingsContext = createContext<{
  ratings: RatingsMap;
  loading: boolean;
  error: string | null;
  setRating: (movieId: number, value: number) => void;
}>({
  ratings: {},
  loading: true,
  error: null,
  setRating: () => {},
});

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const { guest: guestSessionId } = useGuest();
  const [ratings, setRatings] = useState<RatingsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guestSessionId) return;

    async function fetchRatings() {
      setLoading(true);
      setError(null);
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
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load ratings";
        console.error("RatingProvider fetch error:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchRatings();
  }, [guestSessionId]);

  const setRating = useCallback((movieId: number, value: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: value }));
  }, []);

  return (
    <RatingsContext.Provider value={{ ratings, setRating, loading, error }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatings() {
  return useContext(RatingsContext);
}
