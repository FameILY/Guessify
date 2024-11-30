import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/db";

async function getTokens(code, redirect_uri) {
  const url = "https://accounts.spotify.com/api/token";
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
        "Basic " +
        Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  });

  return data
}

export async function GET(req, res) {
  const url = new URL(req.url, process.env.NEXTAUTH_URL);

  const code = url.searchParams.get("code") || null;
  const state = url.searchParams.get("state") || null;

  if (state == null) {
    return NextResponse.redirect(
      "/#" +
      new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
    const tokenResponse = await getTokens(code, "http://localhost:3000/api/connect/spotifycallback");

    if (!tokenResponse.ok) {
        const error = await tokenResponse.json();
        return NextResponse.json({ error });
      }
  
      const tokenData = await tokenResponse.json();

    //   if (tokenData && tokenData.access_token){
    //     const result = await fetch('https://api.spotify.com/v1/me', {
    //         method: 'GET',
    //         headers: {
    //             "Authorization": "Bearer "+tokenData.access_token,
    //         }
    //     })

    //     console.log("RESULTTTT:",result)
    //     const user = await result.json();
    //     try {
    //       await connectMongoDB()
  
    //       // Check if user exists
    //       const existingUser = await User.findOne({ email: user.email });
  
    //       // If user doesn't exist, add them to the database
    //       if (!existingUser) {
    //         await User.create({
    //           email: user.email,
    //           name: user.display_name,
    //           image: user.images[0].url,
    //           tokenData: tokenData.access_token,
    //         });

    //         console.log("NEW USER CREATED")
    //       }
    //     } catch (error) {
    //       console.error("Error creating user into MongoDB", error);
    //     }
    //   }

  
      // Redirect with the received token or return it
      return NextResponse.json(tokenData, { status: 200 });
  }

}
