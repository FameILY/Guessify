"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsSpotify } from "react-icons/bs";
import Difficulty from "@/components/Difficulty";


export default function GuessFriendsArtists({ setClickPlay }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {


    setClickPlay(true);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full mt-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Guess your Friend&apos;s Artists
        </h1>

        <div className="flex flex-col justify-center p-4 shadow">
          <h5 className="mb-2 text-3xl font-bold">How to Play</h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            <ol className="list-decimal list-inside">
              <li>We shuffle your friend&apos;s top artists.</li>
              <li>You guess their correct rankings.</li>
              <li>Get your score and share it with them!</li>
            </ol>
          </p>
        </div>

         
          {/* <>
         <div className="m-4">
          
          <button
            className="bg-green-400 px-4 py-2 rounded-full font-bold flex flex-row items-center"
            onClick={()=> { signIn('spotify', { prompt: "consent" })}}
          >
            <BsSpotify />
            &nbsp; Login to Spotify
          </button>
        </div>
          
          </> */}
        
          <>
      <div className="flex flex-col flex-wrap md:flex-row justify-center items-center">

          <Difficulty
          title={"Jane's Top 5"}
          desc={"guess the order of top 5 artists within the last 4 weeks of their listening activity"}
          image={"/kendrick.jpg"}
          level="easy"
          isLocked={false}
          onClick={handleClick}
          />
         
          </div>
           
          </>
        
      </div>

    </>
  );
}