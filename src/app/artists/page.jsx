"use client";
import Artist from "@/Components/artist";
import { useState, useEffect } from "react";

export default function Artist1() {
  const [originalArtists, setOriginalArtists] = new useState({});
  const [shuffledArtists, setShuffledArtists] = new useState({});
  const [loading, setLoading] = useState(true);

  const [clickOrder, setClickOrder] = useState({});
  const [orderCounter, setOrderCounter] = useState(1);

  useEffect(() => {
    // Fetch artists only once when the component mounts
    async function fetchArtists() {
      try {
        const result = await fetch("/api/artist");
        const data = await result.json();
        const obj = {};
        data.items.forEach((item, index) => {
          obj[index + 1] = {
            name: item.name,
            image: item.images[0]?.url,
          };
        });

        // Set the original list
        setOriginalArtists(obj);
        console.log("original artist",originalArtists)

        // Shuffle the object
        const keys = Object.keys(obj);
        for (let i = keys.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [keys[i], keys[j]] = [keys[j], keys[i]]; // Swap elements
        }

        const shuffledObj = {};
        keys.forEach((key, index) => {
          shuffledObj[index + 1] = obj[key];
        });

        setShuffledArtists(shuffledObj);
      } catch (error) {
        console.log("Error fetching artists:", error);
      } finally {
        setLoading(false);
        console.log("")
      }
    }

    fetchArtists(); // Call fetchArtists once on mount
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p className="text-2xl">Loading...</p>; // Show loading state while fetching
  }

  function handleClick(id) {
    if (!clickOrder[id]) {
      setClickOrder((prev) => ({ ...prev, [id]: orderCounter }));
      setOrderCounter((prev) => prev + 1);
      console.log(clickOrder);
      console.log(orderCounter);

    }
  }

  return (
    <>
    {console.log(shuffledArtists)}
      <div className="md:px-40 flex flex-col justify-center items-center py-4">
        <p className=" font-bold text-3xl sm:text-5xl antialiased  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent md:p-2 p-4">
          Guess Your Top Artist&apos;s Ranking:
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          {Object.entries(shuffledArtists).length === 0 ? (
            <p>No artists to display</p>
          ) : (
            Object.entries(shuffledArtists).map(([key, artist]) => (
              <Artist
                key={`shuffled-${key}`}
                image={artist.image}
                name={artist.name}
                clickOrder={clickOrder[key]} // Pass clickOrder
                onClick={() => handleClick(key)} // Handle click
              />
            
            ))
          )}
        </div>
        {orderCounter == 6 ? (
          <button
            className="bg-slate-900 rounded-full px-4 py-2 font-semibold text-2xl m-2"
          >
            Check
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
