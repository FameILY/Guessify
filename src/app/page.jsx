"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Landing from "@/components/Landing";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Game from "@/components/Game";
import GuessArtists from "@/components/GuessArtists";

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
          {/* <Landing /> */}
          <Header />
          <div className="h-full flex justify-center items-center pt-4">

          <Game
          title={"Guess Your Top 5 Gang!"}
          desc={"Click for fun!"}
          image={"/babykeem.jpeg"}
          link={"/artists"}
           />
           <Game
          title={"Comming Soon"}
          desc={"yeah its comming soon stay tuned!"}
          image={"/kendrick.jpg"}
          link={"/"}
           />
           <Game
          title={"Comming Soon..."}
          desc={"yeah its comming soon stay tuned"}
          image={"/kendrick.jpg"}
          link={"/"}
           />
          </div>
         
          {/* <GuessArtists /> */}
        </>
      )}
    </>
  );
}
