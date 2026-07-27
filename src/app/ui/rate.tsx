"use client";
import { useState } from "react";
import { Rate, message } from "antd";
import { useGuest } from "../lib/guestSession";

export default function RateMove({ movieId }: { movieId: number }) {
  const guestSessionId = useGuest();
  const [value, setValue] = useState(0);
  const [submit, setSubmit] = useState(false);

  async function handleChange(newValue: number) {
    if (!guestSessionId) {
      message.error("Session is not ready.");
      return;
    }
    const tmdbValue = newValue * 2;

    setSubmit(true);
    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          guestSessionId,
          value: tmdbValue,
        }),
      });
      if (!res.ok) throw new Error("Rate request failed");
      setValue(newValue);
      message.success("Rating saved");
    } catch {
      message.error("Failed to save rating");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <Rate
      allowHalf
      count={5}
      value={value}
      disabled={submit}
      onChange={handleChange}
    />
  );
}
