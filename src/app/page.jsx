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
    <div>

      {!session ? (
        <Landing />
      ) : (
        <>
          {/* <Landing /> */}
          <Header />
          <div className="h-full flex flex-col md:flex-row md:flex-wrap justify-center items-center pt-4">

          <Game
          title={"Guess Your Top Artists"}
          desc={"Click for fun!"}
          image={"/babykeem.jpeg"}
          link={"/artists"}
          isLocked={false}

          />
           <Game
          title={"Comming Soon"}
          desc={"yeah its comming soon stay tuned!"}
          image={"/kendrick.jpg"}
          link={"/"}
          isLocked={true}
          />
           <Game
          title={"Comming Soon..."}
          desc={"yeah its comming soon stay tuned"}
          image={"/kendrick.jpg"}
          link={"/"}
          isLocked={true}

           />
          </div>
         
          {/* <GuessArtists /> */}
        </>
      )}
      </div>
    </>
  );
}
