"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContainerContent from "../ui/Content";
import ComponentFooter from "../ui/Footer";
import SearchContainer from "../ui/Input";

const size = 20;

export default function Search() {
  const search = useSearchParams();
  const query = search.get("query") || "";
  const othePage = Number(search.get("page")) || 1;
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

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
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/move?query=${encodeURIComponent(query)}&page=${othePage}`,
        );
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
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
  }, [query, othePage, isOnline]);

  return (
    <>
      <SearchContainer />
      <ContainerContent post={movies} loading={loading} error={error} />
      <ComponentFooter
        current={othePage}
        total={totalResults}
        pageSize={size}
      />
    </>
  );
}
