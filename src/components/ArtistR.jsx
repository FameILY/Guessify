"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export default function ArtistR({ image, name, isCorrect }) {
//   const [userChoice, setUserChoice] = useState({});
  const [bgColor, setBgColor] = useState("")


  // Use useEffect to trigger state update when clickOrder changes
  useEffect(() => {

    if (isCorrect && isCorrect === true) {
      setBgColor("bg-green-400")
    } else {
      setBgColor("bg-red-400")
    }
  }, [ isCorrect]);

  return (
    <>
      <Card
        className={`max-w-96 ${bgColor} dark:hover:border-green-300 hover:border-green-600 hover:scale-110 transition-all duration-150 m-6`}
       
      >

        <CardHeader>
          <Image src={image} alt={"game Image"} width={500} height={500} />
        </CardHeader>

        <CardContent className="px-6">
          <CardTitle className="scroll-m-20 text-xl font-bold tracking-tighter lg:text-xl">
            {name}
          </CardTitle>

          {/* <CardDescription className="scroll-m-20 dark:text-zinc-400 text-lg font-normal tracking-tighter mt-2"></CardDescription> */}
        </CardContent>
      </Card>
   
    </>
  );
}
