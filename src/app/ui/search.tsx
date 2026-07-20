"use client";
import { Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./css/search-style.css";

const inputStyle = {
  width: 938,
  height: 40,
};

export default function SearchContainer({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (searchValue: string) => {
    const search = searchValue.trim() || "return";
    router.push(`/?query=${encodeURIComponent(search)}&page=1`);
  };

  return (
    <div className="searchContainerStyle">
      <Input
        style={inputStyle}
        placeholder="Type to search"
        value={value}
        type="text"
        onChange={handleSearch}
      />
    </div>
  );
}
