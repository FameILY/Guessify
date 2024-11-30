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
      <div
        className="group relative max-w-80 md:max-w-60 lg:max-w-52 dark:hover:border-green-300 hover:border-green-600 hover:scale-110 transition-all duration-150 m-6"
        
      >
        <div className="">

        {clickOrder && (
          <div
            className="absolute top-[44px] right-[-5px] group-hover:top-[20px] group-hover:right-[-20px] bg-green-500 px-5 py-3 rounded-full transition-all scroll-m-20 text-base font-bold tracking-tighter"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {clickOrder}
          </div>
        )}
        </div>

        <CardHeader  className="" onClick={onClick}>
          <Image className="rounded-lg " src={image} alt={"game Image"} width={500} height={500} />
          <CardTitle className=" text-zinc-100 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 absolute bottom-[25px] left-[24px] group-hover:left-[-15px] group-hover:bottom-[2px] rounded-xl backdrop-blur-sm px-2 bg-opacity-25 scroll-m-20 text-xl font-bold tracking-tighter lg:text-xl transition-all">
            {name}
          </CardTitle>
        </CardHeader>

        {/* <CardContent className="px-6"> */}
          {/* <CardTitle className="scroll-m-20 text-xl font-bold tracking-tighter lg:text-xl">
            {name}
          </CardTitle> */}

          {/* <CardDescription className="scroll-m-20 dark:text-zinc-400 text-lg font-normal tracking-tighter mt-2"></CardDescription> */}
        {/* </CardContent> */}
      </div>
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
