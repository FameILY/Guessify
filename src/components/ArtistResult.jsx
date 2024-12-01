import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card";

function ArtistResult({ correct, incorrect, original, limit }) {
  const [headline, setHeadline] = useState("");
  const [progress, setProgress] = useState({ class: "", value: "" });
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();

  const [shareText, setShareText] = useState("Check out this cool spotify guessing game!");
  const [shareUrl, setShareUrl] = useState(window.location.href); // or your custom URL

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Guess Your Top Artists',
          text: shareText,
          url: shareUrl,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this platform.");
    }
  };

  useEffect(() => {
    let updatedHeadline = "";
    let updatedProgress = {
      class: "",
      value: "",
    };

    const percentage = Math.floor((correct / limit) * 100);

    switch (true) {
    case percentage === 0:
      updatedHeadline = "Oops, better luck next time! 🎯";
      updatedProgress = { class: "progress progress-error w-32 md:w-96 m-2", value: "0" };
      break;

    case percentage > 0 && percentage <= 20:
      updatedHeadline = "One hit wonder! Keep it up! 🎶";
      updatedProgress = { class: "progress progress-error w-32 md:w-96 m-2", value: `${percentage}` };
      break;

    case percentage > 20 && percentage <= 40:
      updatedHeadline = "You're getting the hang of it! 🎧";
      updatedProgress = { class: "progress progress-warning w-32 md:w-96 m-2", value: `${percentage}` };
      break;

    case percentage > 40 && percentage <= 60:
      updatedHeadline = "You know your tunes pretty well! 🎵";
      updatedProgress = { class: "progress progress-info w-32 md:w-96 m-2", value: `${percentage}` };
      break;

    case percentage > 60 && percentage <= 80:
      updatedHeadline = "You nailed it… almost! 🥳";
      updatedProgress = { class: "progress progress-accent w-32 md:w-96 m-2", value: `${percentage}` };
      break;

    case percentage > 80 && percentage <= 100:
      updatedHeadline = "Perfect score! You're a music wizard! 🎉";
      updatedProgress = { class: "progress progress-success w-32 md:w-96 m-2", value: "100" };
      setShowAnswer(true);
      break;

    default:
      updatedHeadline = "Invalid score. Try again!";
      updatedProgress = { class: "progress progress-error w-32 md:w-96 m-2", value: "0" };
  }

    setHeadline(updatedHeadline);
    setProgress(updatedProgress);
  }, [correct, limit]);

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <p className="  hover:text-shadow-glow scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl m-2 transition-all">
        {headline}
      </p>  
      <progress
        className={progress.class}
        value={progress.value}
        max="100"
      ></progress>
      <p className="scroll-m-20 text-xl font-bold tracking-tight">Correct Picks: {correct}</p>
      <p className="scroll-m-20 text-xl font-bold tracking-tight">Incorrect Picks: {incorrect}</p>
      
      {showAnswer ? (
        <div className="flex flex-col justify-normal">
          {Object.values(original).map((item, index) => (
            <Card key={index} className="flex flex-row m-2 hover:scale-105 transition-all hover:border-zinc-200">
                <CardContent className="flex justify-center items-center"><p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">{index + 1}</p></CardContent>
            <CardHeader><Image src={item.image} width={100} height={100} alt=""></Image></CardHeader>
              <CardContent className="flex justify-center items-center">  
                <p className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-5xl">{item.name}</p>
                {/* <p className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">Genres:</p> */}

                </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Button
        className="m-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          Play Again
        </Button>
      )}

      <Button className="m-2 bg-green-400 hover:bg-green-300" onClick={handleShare}>Share</Button>
    </div>
  );
}

export default ArtistResult;
