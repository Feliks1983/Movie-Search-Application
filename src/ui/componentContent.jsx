import { format } from "date-fns";
import Buttons from "./Buttons";
import "./css/component-content.css";
import Image from "next/image";
import Profile from "../../public/assets/img.png";
import { Description } from "../app/utils/description";
import "./css/mobile-component.css";
import LoadSpin from "./Spin";
import ErrorPage from "../app/dashboard/error";
import RateMove from "./Rate";

function getRatingColor(value) {
  if (value <= 3) return "#E90000";
  if (value <= 5) return "#E97E00";
  if (value <= 7) return "#E9D100";
  return "#66E900";
}

export default function ComponentContent({ movie, loading, error, readOnlyRating = false }) {
  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadSpin />;
  if (!movie) return null;
  const { vote_average = 0, poster_path } = movie;

  const posterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : Profile;

  const voteAverage = Math.floor(vote_average);

  return (
    <div className="component-content">
      <Image
        loading="eager"
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
          <div
            className="component-content_rating"
            style={{ backgroundColor: getRatingColor(vote_average) }}
          >
            {voteAverage}
          </div>
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
          <RateMove movieId={movie.id} readOnly={readOnlyRating} />
        </div>
      </div>
    </div>
  );
}
