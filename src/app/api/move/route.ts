import { NextRequest, NextResponse } from "next/server";

const page = 20;

async function fetchMovies(query: string, page: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&adult=false&language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error("TMDB error:", response.status, await response.text());
    return { results: [], total_results: 0 };
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query") || "";
  const othePage = Number(searchParams.get("page")) || 1;
  const startPage = (othePage - 1) * page;
  const endPage = startPage + page - 1;
  const pageStart = Math.floor(startPage / page) + 1;
  const pageEnd = Math.floor(endPage / page) + 1;
  const pagesFetch = [];

  for (let p = pageStart; p <= pageEnd; p++) pagesFetch.push(p);

  const respons = [];
  for (let p = pageStart; p <= pageEnd; p++) {
    const data = await fetchMovies(query, p);
    respons.push(data);
  }

  const results = respons.flatMap((r) => r.results || []);
  const totalResults = respons[0]?.total_results || 0;

  const offset = startPage - (pageStart - 1) * page;
  const movies = results.slice(offset, offset + page);
  const arrMovies = Array.from(new Map(movies.map((m) => [m.id, m])).values());
  return NextResponse.json({ results: arrMovies, totalResults });
}
