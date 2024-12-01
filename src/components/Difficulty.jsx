import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

function Difficulty({ image, title, desc, level, isLocked, onClick }) {

    let style = ""

    switch (level){
        case "easy":
            style = "hover:bg-green-200 dark:hover:bg-green-800 border-green-600 hover:border-none dark:border-green-300 " 
            break;
        case "medium":
            style = "hover:bg-yellow-200 dark:hover:bg-yellow-800 border-yellow-600 hover:border-none dark:border-yellow-300 " 
            break;
        case "hard":
            style = "hover:bg-red-200 dark:hover:bg-red-800 border-red-600 hover:border-none dark:border-red-300 " 
            break;
    }
 

  return (
    <Card
    onClick={isLocked ? null : onClick} // Prevent click if locked
      className={`max-w-64 ${ isLocked ? " bg-zinc-200 dark:bg-zinc-900 dark:hover:border-zinc-300 hover:border-zinc-600" : style}  hover:scale-105 transition-all duration-150 m-6 cursor-pointer`}
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

export default Difficulty;
