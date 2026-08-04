"use client";
import { Tag } from "antd";
import './css/button-mobile.css'
import { useGenres } from "../lib/genresContext";

export default function Buttons({ genreIds }) {
  const {genres} = useGenres();
    const genreNames = genreIds
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean);

  if (genreNames.length === 0) return null;
  return (
    <div className="button">
      {genreNames.map((name) => (
        <Tag key={name}>{name}</Tag>
      ))}
    </div>
  );
}
