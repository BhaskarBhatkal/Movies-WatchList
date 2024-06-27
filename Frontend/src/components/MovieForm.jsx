import React, { useState } from "react";
import { useMovieWatchList } from "../contexts";

function MovieForm() {
  const [movie, setMovie] = useState("");
  const { addMovie } = useMovieWatchList();

  const add = (e) => {
    e.preventDefault();

    if (!movie) return;

    addMovie({ movie, completed: false });
    setMovie("");
  };
  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Enter movie name here..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default MovieForm;
