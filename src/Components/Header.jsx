"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button.jsx"
import { BsSpotify } from "react-icons/bs";
import CustomAvatar from "@/components/CustomAvatar";
import { ModeToggle } from "@/components/toggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  // async function logout() {
  //   try {
  //     await signOut("spotify");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function handleClick(event) {
  //   try {
  //     await signIn("spotify");

  //     if (session) {
  //       console.log(session);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  return (
    <>
      <nav className="bg-zinc-950 bg-opacity-70 backdrop-blur md:px-32 sticky top-0 z-50 flex items-center gap-2 justify-between p-2">
        <p className="text-lg font-semibold">Guessify</p>
        <p onClick={ ()=> { router.back()}}>Back</p>

        <div className="flex flex-row items-center">
          <p className="text-base me-4">
            {session?.user.name || ""}
          </p>
          <ModeToggle/>
          <CustomAvatar
           
            src={session?.user.image || "/defaultavatar.jpg"}
           
          ></CustomAvatar>
        {/* {session ? (
            <>
            <Button
              className=""
              onClick={logout}
              variant="ghost"
              >
              Log out
            </Button>
            </>
        ) : (
            <>
               <Button
            className=""
            variant="ghost"
            onClick={handleClick}
          >
            <BsSpotify />
            &nbsp; Login to Spotify
          </Button>
          </>
        )} */}
        </div>
      </nav>
    </>
  );
}
