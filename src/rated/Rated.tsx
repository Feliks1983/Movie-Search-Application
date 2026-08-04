"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContainerContent from "../ui/Content";
import ComponentFooter from "../ui/Footer";
import { useGuest } from "../lib/guestSession";

const size = 20;

export default function Rated() {
  const search = useSearchParams();
  const othePage = Number(search.get("page")) || 1;
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const {guest: guestSession} = useGuest();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      if (!isOnline) {
        setLoading(false);
        setError("There is no internet connection.");
        return;
      }
      if (!guestSession) return;
      setLoading(true);
      setError(null);
      try {
        const guest = await fetch(
          `/api/rated?guest_session_id=${guestSession}&page=${othePage}`,
        );
        if (!guest.ok) {
          throw new Error(`Guest session status ${guest.status}`);
        }
        const data = await guest.json();
        setMovies(data.results || []);
        setTotalResults(data.totalResults || 0);
      } catch {
        if (!navigator.onLine) {
          setError("There is no internet connection.");
        } else {
          setError("Loading error");
        }
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [othePage, isOnline, guestSession]);

  return (
    <>
      <ContainerContent
        post={movies}
        loading={loading}
        error={error}
        readOnlyRating
      />
      <ComponentFooter
        current={othePage}
        total={totalResults}
        pageSize={size}
      />
    </>
  );
}
