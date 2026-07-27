"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Layout } from "antd";
import ContainerContent from "../ui/content";
import ComponentFooter from "../ui/footer";

const size = 20;

export default function Rated() {
  const search = useSearchParams();
  const othePage = Number(search.get("page")) || 1;
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
       let guest = localStorage.getItem("rated");
       if (!guest) {
         const dataApi = await fetch(`/api/rated`);
         if (!dataApi.ok) {
           throw new Error(`Guest session status ${dataApi.status}`);
         }
         const session = await dataApi.json();
         console.log(session);
         
         guest = session.guest_session_id;
         localStorage.setItem("rated", dataApi);
       }

       const res = await fetch(
         `/api/rated?guest_session_id=${guest}&page=${othePage}`,
       );
       if (!res.ok) {
         throw new Error(`Request failed with status ${res.status}`);
       }
       const data = await res.json();
       setMovies(data.results || []);
       setTotalResults(data.totalResults || 0);
       setLoading(false);
     } catch (err) {
       if (!navigator.onLine) {
         setError("There is no internet connection.");
       } else {
         setError("Loading error");
       }
       setMovies([]);
       setTotalResults(0);
       setLoading(false);
     }
   }
   fetchMovies();
 }, [othePage, isOnline]);

  return (
    <div className="container">
      <div className="page">
        <Layout>
          <ContainerContent post={movies} loading={loading} error={error} />
          <ComponentFooter
            current={othePage}
            total={totalResults}
            pageSize={size}
          />
        </Layout>
      </div>
    </div>
  );
}
