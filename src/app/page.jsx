"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Landing from "@/Components/landing";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
     router.push("/artists");
  };

  return (
    <>
      {!session ? (
        <Landing />
      ) : (
        <>
        <Landing />

          <div className="flex justify-center items-center flex-col">
            <h1 className="font-medium text-4xl p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Spotify Top Artist Challenge
            </h1>

            <p className="font-normal text-2xl bg-gradient-to-r px-4 mb-2 mx-2">
              Can you guess your top artists rankings?
            </p>
            <p className="font-normal text-2xl bg-gradient-to-r px-4 mx-2">
             
              Test your knowledge and challenge your friends!
            </p>

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
              className="bg-green-400 px-6 py-2 rounded-full font-bold text-2xl flex flex-row items-center hover:bg-green-800 hover:border"
              onClick={handleClick}
            >
              Play
            </button>
          </div>
        </>
      )}
    </>
  );
}
