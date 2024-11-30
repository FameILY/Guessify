"use client";
import Artist from "@/components/Artist";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ArtistResult from "@/components/ArtistResult";
import ArtistR from "@/components/ArtistR";
import Header from "@/components/Header";
import GuessArtists from "@/components/GuessArtists";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { signIn, signOut, useSession } from "next-auth/react";


export default function Artist1() {
  const [originalArtists, setOriginalArtists] = new useState({});
  const [shuffledArtists, setShuffledArtists] = new useState({});
  const [loading, setLoading] = useState(true);

  const [clickOrder, setClickOrder] = useState({});
  const [orderCounter, setOrderCounter] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const [clickPlay, setClickPlay] = useState(false);
  const [login, setLogin] = useState(false);
  const { data: session } = useSession();

  const [ fetchedData, setFetchedData] = useState("");

  const { toast } = useToast()

  useEffect(() =>{
    if (session && session.error == "RefreshAccessTokenError"){
      console.log(new Date("ACCESS TOKEN EXPIRY: ",session?.accessTokenExpires))
      console.log(new Date("TODAY:",Date.now()))
      toast({
        title: "Session Expired, Logout and Login Again!",
        description: "do it",
        variant: "destructive",
        action: <ToastAction onClick={() => { signOut("spotify") }} altText="Logout">Logout</ToastAction>,
      })
    } else if (session && session.accessTokenExpires > Date.now()) {
      console.log("HJEYYYYY")
      console.log("ACCESS TOKEN EXPIRY: ", new Date(session?.accessTokenExpires))
      console.log("TODAY:", new Date(Date.now()))
      toast({
        title: "Everything seems fine!",
        description: "if it didnt, make sure to provide feedback :)",
      })
      setLogin(false)

    } else {
      setLogin(true)
      toast({
        title: "You Must Login To Play!",
        description: "Click here to login with your spotify account!",
        variant: "destructive",
        action: <ToastAction onClick={() => { signIn("spotify") }} altText="Login">Login</ToastAction>,

      })
    }
  }, [session, toast]
  )

  useEffect(() => {
    // Fetch artists only once when the component mounts
    async function fetchArtists() {
      try {
        const result = await fetch("/api/artist");
        const data = await result.json();
        console.log("DATA FROM SPOTIFY API: ",data);
        setFetchedData(data)
        const obj = {};
        data.items.forEach((item, index) => {
          obj[index + 1] = {
            name: item.name,
            image: item.images[0]?.url,
            // url: item.external_urls[0].spotify,
            // genres: item.genres
          };
        });

        // Set the original list
        setOriginalArtists(obj);
        // console.log("original artist", obj);

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
        console.log("");
      }
    }

    fetchArtists(); // Call fetchArtists once on mount
  }, [setOriginalArtists, setShuffledArtists]); // Empty dependency array ensures this runs only once

  
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    ); // Show loading state while fetching
  }

  function handleClick(id) {
    if (!clickOrder[id]) {
      setClickOrder((prev) => {
        const updatedOrder = { ...prev, [id]: orderCounter };
        return updatedOrder;
      });
      setOrderCounter((prev) => prev + 1);
    }
    console.log("clickOrder:", clickOrder);
    console.log("orderCounter:", orderCounter);
  }

  function logic(ogArray, shuffArray, userArray) {
    let correct = 0,
      incorrect = 0;

    for (let artistKey in userArray) {
      const order = userArray[artistKey]; // The order in which this artist was clicked
      const shuffledArtist = shuffArray[artistKey]; // Artist details from shuffled list
      const originalArtist = ogArray[order]; // Correct artist at this order

      if (shuffledArtist?.name === originalArtist?.name) {
        console.log(
          `${artistKey} CORRECT: You chose ${shuffledArtist.name}, correct answer is ${originalArtist.name}`
        );
        shuffledArtist.isCorrect = true; // Update the shuffled artist with the correctness
        correct++;
      } else {
        console.log(
          `${artistKey} WRONG: You chose ${shuffledArtist?.name}, correct answer is ${originalArtist?.name}`
        );
        shuffledArtist.isCorrect = false; // Mark as incorrect
        incorrect++;
      }
    }

    console.log("Results: Correct =", correct, "Incorrect =", incorrect);
    return { correct, incorrect };
  }

  const result = () => {
    console.log("Og: ", originalArtists);
    console.log("Shuff: ", shuffledArtists);
    console.log("User's Choice: ", clickOrder);
    // console.log("Called");

    const { correct, incorrect } = logic(
      originalArtists,
      shuffledArtists,
      clickOrder
    );
    console.log("HERE IT IS LOGGED RETURNED", correct, incorrect);
    setCorrect(correct);
    setIncorrect(incorrect);
    setShowResult(true);
  };

  return (
    <>
      <Header />

      <div className="md:px-24 flex flex-col justify-center items-center h-full">
        {clickPlay ? (
          <>
            <p className=" font-extrabold mb-6 mt-2 text-3xl sm:text-5xl antialiased bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent p-2 tracking-tight">
              Guess Your Top 5
            </p>

            <div className="flex flex-row justify-center flex-wrap md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap">
              {Object.entries(shuffledArtists).length === 0 ? (
                <>
                <p>Nothing to display 😿 its on us</p>
                <pre className="overflow-y w-96">{JSON.stringify(fetchedData, null, 2)}</pre>
                </>
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
              <Button onClick={result} className="my-4">
                Check
              </Button>
            ) : (
              <></>
            )}

            {showResult ? (
              <div className="h-full py-2 px-2 rounded-xl bg-gradient-to-b dark:from-green-800 dark:via-gray-900 dark:to-black from-green-200 via-gray-200 to-zinc-100 bg-[length:200%_200%] animate-gradient-move">
              <div className="flex flex-col w-80 md:w-full">
                <ArtistResult
                  correct={correct}
                  incorrect={incorrect}
                  original={originalArtists}
                />

                <div className="flex justify-center items-center m-2">
                  <p className="scroll-m-20 text-2xl font-bold tracking-tight">
                    Your Guesses 👇
                  </p>
                </div>
                <div className="flex flex-row justify-center flex-wrap md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap">
                  {Object.entries(shuffledArtists).length === 0 ? (
                    <p>Nothing to display 😿 check your session</p>
                  ) : (
                    Object.entries(shuffledArtists).map(([key, artist]) => (
                      <ArtistR
                        key={`shuffled-${key}`}
                        image={artist.image}
                        name={artist.name}
                        isCorrect={artist.isCorrect}
                      />
                    ))
                  )}
                </div>
              </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <GuessArtists setClickPlay={setClickPlay} login={login} />
        )}
        </div>
    </>
  );
}
