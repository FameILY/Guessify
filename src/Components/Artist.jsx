"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Artist({image, name, clickOrder, onClick}) {
  const [userChoice, setUserChoice] = useState({})

  // Use useEffect to trigger state update when clickOrder changes
  useEffect(() => {
    if (clickOrder) {
      setUserChoice((prev) => ({ ...prev, userChoice: name }));
    }
  }, [clickOrder, name]);

  return (
    <>
      <div
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
      </div>
    </>
  )
}
