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
export default function Artist({ image, name, clickOrder, onClick }) {
  const [userChoice, setUserChoice] = useState({});

  // Use useEffect to trigger state update when clickOrder changes
  useEffect(() => {
    if (clickOrder) {
      setUserChoice((prev) => ({ ...prev, userChoice: name }));
    }
  }, [clickOrder, name]);

  return (
    <>
      <Card
        className="relative max-w-96 dark:hover:border-green-300 hover:border-green-600 hover:scale-110 transition-all duration-150 m-6"
        onClick={onClick}
      >
        {clickOrder && (
          <div
            className="absolute top-[-5px] left-[-5px] bg-green-500 px-5 py-3 rounded-full"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {clickOrder}
          </div>
        )}

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
      {/* <div
        className="flex justify-center flex-col rounded shadow p-4 cursor-pointer"
        onClick={onClick}
      >
        <div className="relative">
          <Image
            className="rounded-t-lg"
            src={image}
            alt="image"
            layout="responsive"
            width={200}
            height={200}
          />
          {clickOrder && (
            <div className="absolute top-[-20px] left-[-20px] bg-green-500 px-5 py-3 rounded-full"
              style={{ transform: 'translate(-50%, -50%)' }}>
              {clickOrder}
            </div>
          )}
        </div>
        <div className="p-5 flex justify-center">
          <p className="text-2xl font-semibold">{name}</p>
        </div>
      </div> */}
    </>
  );
}
