import { Layout } from "antd";
import ComponentHeader from "./ui/header";
import ContainerContent from "./ui/content";
import ComponentFooter from "./ui/footer";
import SearchContainer from "./ui/search";

type VideoEntry = { movieId: number; video: { key: string } | false };

const page = 20;
const size = 6;

async function fetchPage(query: string, page: number) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&adult=false&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return { results: [], total_results: 0 };
  return res.json();
}

async function fetchVideoMovie(movieId: number): Promise<VideoEntry> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      },
    );

    if (!res.ok) return { movieId, video: false };

    const data = await res.json();
    const trailer =
      (data.results || []).find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      ) || false;

    return { movieId, video: trailer ? { key: trailer.key } : false };
  } catch {
    return { movieId, video: false };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const search = await searchParams;
  const query = search.query || "return";
  const othePage = Number(search.page) || 1;
  const startPage = (othePage - 1) * size;
  const endPage = startPage + size - 1;
  const pageStart = Math.floor(startPage / page) + 1;
  const pageEnd = Math.floor(endPage / page) + 1;
  const pagesFetch = [];

  for (let p = pageStart; p <= pageEnd; p++) pagesFetch.push(p);

  const respons = await Promise.all(
    pagesFetch.map((p) => fetchPage(query, p)),
  );

  const results = respons.flatMap((r) => r.results || []);
  const totalResults = respons[0]?.total_results || 0;

  const offset = startPage - (pageStart - 1) * page;
  const movies = results.slice(offset, offset + size);
console.log(movies);

  const videos: VideoEntry[] = await Promise.all(
    movies.map((movie) => fetchVideoMovie(movie.id)),
  );

  return (
    <div className="container">
      <div className="page">
        <Layout>
          <ComponentHeader />
          <SearchContainer />
          <ContainerContent post={movies} videos={videos} />
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
