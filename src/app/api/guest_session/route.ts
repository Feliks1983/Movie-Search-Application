import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY Error" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
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
    return NextResponse.json(data);
    
  } catch (err) {
    return NextResponse.json(
      { error: "Internal fetch error", details: String(err) },
      { status: 500 },
    );
  }
}
