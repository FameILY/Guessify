import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";


export default function CustomAvatar({ src }) {
  const { data: session } = useSession();

  async function logout() {
    try {
      await signOut("spotify");
    } catch (err) {
      console.log(err);
    }
  }

  async function login(event) {
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
    <DropdownMenu className="relative">
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage src={src} />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        { session ? (
          <>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
        <DropdownMenuItem onClick={login}>Login</DropdownMenuItem>

          </>
        )}
      
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
