"use client";
import { Input } from "antd";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./css/input-style.css";
import { OfflineAlert } from "./Alert";
import debounce from "../app/utils/debonce";

export default function SearchContainer() {
  const [value, setValue] = useState("");
  const [offline, setOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const online = () => setOffline(false);
    const offline = () => setOffline(true);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (!navigator.onLine) {
        setOffline(true);
        return;
      }
      setOffline(false);
      const search = searchValue.trim() || "";
      router.push(`/?query=${encodeURIComponent(search)}&page=1`);
    },
    [router],
  );

  const debounceSearch = useMemo(
    () => debounce(handleSearch, 500),
    [handleSearch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceSearch(newValue);
  };

  return (
    <div className="search-ui">
      <Input
        placeholder="Type to search"
        value={value}
        type="text"
        onChange={handleChange}
      />
      {offline && <OfflineAlert />}
    </div>
  );
}
