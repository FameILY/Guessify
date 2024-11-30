import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";


//refresh logic here

async function refreshAccessToken(token) {
  try {
    console.log("refreshing... ")

    const url = "https://accounts.spotify.com/api/token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Expiry time
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Keep original if not returned
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


//ends

const options = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-private user-read-email user-top-read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }

      // Return token if it has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log("Access token expired")

      // Refresh the access token
      return await refreshAccessToken(token);
      
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.accessTokenExpires = token.accessTokenExpires;
      // console.log("Session:",session);
      return session;
    },
  },
};

export async function GET(req, res) {
  return NextAuth(req, res, options);
}

export async function POST(req, res) {
  return NextAuth(req, res, options);
}

