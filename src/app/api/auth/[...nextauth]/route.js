import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

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
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      console.log("Session:",session);
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

