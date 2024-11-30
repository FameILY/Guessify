import { NextResponse } from "next/server";

export async function GET(req, res) {
  console.log("HITT");

  try {
    var state = "WHdasdasdDU-2431SIAsasD-IJS431IJsdda-OAJDJA";
    var scope = "user-read-private user-read-email user-top-read";
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: `http://localhost:3000/api/connect/spotifycallback`,
      state: state,
    });
    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

    return NextResponse.redirect(url);
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
