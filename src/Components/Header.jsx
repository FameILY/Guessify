"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/Components/ui/button.jsx"
import { BsSpotify } from "react-icons/bs";
import CustomAvatar from "@/Components/CustomAvatar";
import { ModeToggle } from "@/Components/toggle";

export default function Header() {
  const { data: session } = useSession();

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
      <nav className="bg-transparent px-32 sticky top-0 z-50 flex items-center justify-between p-2">
        <p className="text-lg font-semibold">Guessify</p>

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
