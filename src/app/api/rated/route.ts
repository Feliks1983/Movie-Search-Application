import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY error" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const guestSessionId = searchParams.get("guest_session_id");
  const page = searchParams.get("page") || "1";

  if (!guestSessionId) {
    return NextResponse.json(
      { error: "guest_session_id Error" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`,
    { cache: "no-store" },
  );
  
  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json(
      { error: "TMDB request failed", details: error },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json({
    results: data.results || [],
    totalResults: data.total_results || 0,
  });
}
