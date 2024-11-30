import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function fetchTopArtists(accessToken) {
  const params = new URLSearchParams({
    limit: 5,
  });
  const url = `https://api.spotify.com/v1/me/top/artists?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  
  return data;
}

export async function GET(req) {
  //   console.log(req)
  const token = await getToken({ req });
  console.log("Retrieved token:", token);

  if (token?.accessToken) {
    try {
      const data = await fetchTopArtists(token.accessToken);
      console.log("DATA:",data)
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return new Response(error, { status: 500 });
    }
  } else {
    return NextResponse.json("Unauthorized, no token", { status: 401 });
  }
}
