import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Game({ image, title, desc, link }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(link);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="max-w-64 dark:hover:border-green-300 hover:border-green-600 hover:scale-105 transition-all duration-150 m-6 cursor-pointer"
    >
      <CardHeader>
        <Image src={image} alt={"game Image"} width={200} height={200} />
      </CardHeader>

      <CardContent className="px-6">
        <CardTitle className="scroll-m-20 text-xl font-bold tracking-tighter lg:text-xl">
          {title}
        </CardTitle>

        <CardDescription className="scroll-m-20 dark:text-zinc-400 text-lg font-normal tracking-tighter mt-2">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default Game;
