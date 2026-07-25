"use client";
import { Input } from "antd";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./css/search-style.css";
import { OfflineAlert } from "./alert";

const debounce = <T extends (...args: string[]) => void>(
  fn: T,
  debounceTime = 500,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), debounceTime);
  };
};

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
    <div className="searchContainerStyle">
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
