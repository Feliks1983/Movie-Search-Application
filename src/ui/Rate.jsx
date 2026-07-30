"use client";
import { useState, useEffect } from "react";
import { Rate, message } from "antd";
import { useGuest } from "../lib/guestSession";

export default function RateMove({ movieId, readOnly = false }) {
  const guestSessionId = useGuest();
  const [value, setValue] = useState(0);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!guestSessionId) return;
    async function loadRating() {
      try {
        const res = await fetch(
          `/api/rated?guest_session_id=${guestSessionId}&page=1`,
        );
        if (!res.ok) return;
        const data = await res.json();
        const rated = (data.results || []).find((m) => m.id === movieId);
        if (rated?.rating !== undefined) {
          setValue(rated.rating);
        }
      } catch {}
    }
    loadRating();
  }, [guestSessionId, movieId]);

  async function handleChange(newValue) {
    if(readOnly) return;
    if (!guestSessionId) {
      message.error("Session is not ready.");
      return;
    }
    const tmdbValue = newValue;
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
      count={10}
      size="small"
      value={value}
      disabled={submit}
      onChange={handleChange}
    />
  );
}
