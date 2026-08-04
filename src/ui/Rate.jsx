"use client";
import { useState } from "react";
import { Rate, message } from "antd";
import { useGuest } from "../lib/guestSession";
import { useRatings } from "../lib/ratingsContext";

export default function RateMove({ movieId, readOnly = false }) {
  const {guest: guestSessionId} = useGuest();
  const [submit, setSubmit] = useState(false);
  const { ratings, setRating } = useRatings();

  const value = ratings[movieId] ?? 0;

  async function handleChange(newValue) {
    if(readOnly) return;
    if (!guestSessionId) {
      message.error("Session is not ready.");
      return;
    }
    setSubmit(true);
    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          guestSessionId,
          value: newValue,
        }),
      });
      if (!res.ok) throw new Error("Rate request failed");
      setRating(movieId, newValue);
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
      count={10}
      size="small"
      value={value}
      disabled={submit}
      onChange={handleChange}
    />
  );
}
