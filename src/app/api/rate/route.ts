import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY error" }, { status: 500 });
  }

  const body = await request.json();
  const { movieId, guestSessionId, value } = body;

  if (!movieId || !guestSessionId || value === undefined) {
    return NextResponse.json(
      { error: "movieId Error" },
      { status: 400 },
    );
  }

  if (value < 0.5 || value > 10) {
    return NextResponse.json(
      { error: "Error" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json(
      { error: "TMDB request failed", details: error },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
