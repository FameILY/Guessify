"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GuessArtists({setClickPlay}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    setClickPlay(true);
    
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Guess your artists
        </h1>

        <div className="flex flex-col justify-center p-4 shadow">
          <h5 className="mb-2 text-3xl font-bold">How to Play</h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            <ol className="list-decimal list-inside">
              <li>We shuffle your top artists.</li>
              <li>You guess their correct rankings.</li>
              <li>Get your score and share it with friends!</li>
            </ol>
          </p>
        </div>

        <button
          className="relative overflow-hidden px-8 py-3 rounded-full text-lg font-semibold text-zinc-100 bg-gradient-to-r from-green-500 to-green-400 shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none"
          onClick={handleClick}
        >
          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
          <span
            className="absolute -inset-0 bg-white rounded-full opacity-0 animate-ping pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              left: "-50%",
              top: "-50%",
            }}
          ></span>
          Play
        </button>
      </div>
    </>
  );
}
