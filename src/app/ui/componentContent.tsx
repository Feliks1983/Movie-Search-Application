"use client";
import { format } from "date-fns";
import Buttons from "./button";
import "./css/component-content.css";
import Image from "next/image";
import Profile from "../../../public/assets/img.png";
import Star from "../../../public/assets/tile0.png";
import StarHalf from "../../../public/assets/tile2.png";
import StarDefault from "../../../public/assets/tile3.png";
import { Description } from "../api/description";
import "./css/mobile-component.css";
import LoadSpin from "./spin";

function getStar(rating = 0, maxStars = 10) {
  const star = (rating / 10) * maxStars;
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (star >= i) stars.push("full");
    else if (star >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }
  return stars;
}

export default function ComponentContent({ movie, loading }) {
  if (!movie) return null;

  const { vote_average = 0, poster_path } = movie;

  const posterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : Profile;

  const stars = getStar(vote_average);
  const voteAverage = Math.floor(vote_average);
  
  if (loading)
    return (
      <div>
        <LoadSpin />
      </div>
    );
  return (
    <div className="component-content">
      <Image
        loading="lazy"
        src={posterSrc || Profile}
        alt="img"
        width={183}
        height={281}
        unoptimized={Boolean(poster_path)}
      />
      <div className="component-content_list">
        <div className="component-content_title">
          <div className="component-content_title-text">
            <h5>{Description(movie.title, 25)}</h5>
          </div>
          <div className="component-content_rating">{voteAverage}</div>
        </div>
        <div className="component-content_data">
          {movie.release_date
            ? format(new Date(movie.release_date), "dd MMMM yyyy")
            : "Date unknown"}
        </div>
        <div className="component-content_buttons">
          <Buttons />
        </div>
      </div>
      <div className="component-content_item">
        <div className="component-content_text">
          <p>
            {Description(movie.overview, 150) || "No description available."}
          </p>
        </div>
        <div className="component-content_stars">
          {stars.map((state, index) => (
            <Image
              key={index}
              loading="lazy"
              src={
                state === "full"
                  ? Star
                  : state === "half"
                    ? StarHalf
                    : StarDefault
              }
              alt="star"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
