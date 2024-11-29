"use client"
import { BsSpotify } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "@/components/Header";

export default function Landing() {
  const { data: session } = useSession();

  async function handleClick(event) {
    try {
      await signIn("spotify");

      if (session) {
        console.log(session);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center p-4 items-center">

        {/* <div className="flex justify-center">
          <p className="font-bold text-5xl antialiased p-2">
            Are you a music geek?
          </p>
          <p className="font-bold text-5xl antialiased  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent p-2">
            Let&apos;s find out
          </p>
        </div> */}

        <div className="m-4">
          <button
            className="bg-green-400 px-4 py-2 rounded-full font-bold flex flex-row items-center"
            onClick={handleClick}
          >
            <BsSpotify />
            &nbsp; Login to Spotify
          </button>
        </div>
      </div>
    </>
  );
}
