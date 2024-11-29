import React from "react";

function ArtistResult({ correct, incorrect, original }) {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl m-2">
        Results are here:
      </p>
      <p>Correct Picks: {correct}</p>
      <p>Incorrect Picks: {incorrect}</p>

      {/* <p>get 100 percent accuracy to know your top 5</p> */}
      <b>Your top 5: </b>

      {Object.values(original).map((item, index) => (
        <ol key={index}>
          <li>{index +1 +") " + item.name}</li>
        </ol>
      ))}
    </div>
  );
}

export default ArtistResult;
