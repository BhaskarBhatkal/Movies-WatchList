import React, { useState } from "react";
import { useMovieWatchList } from "../contexts";

function MovieItem({ movie }) {
  const [isMovieEditable, setIsMovieEditable] = useState(false);
  const [movieMsg, setMovieMsg] = useState(movie.movie);
  const { updateMovie, deleteMovie, toggleWatched } = useMovieWatchList();

  const editMovie = () => {
    updateMovie(movie.id, { ...movie, movie: movieMsg });
    setIsMovieEditable(false);
  };

  const togglewatch = () => {
    toggleWatched(movie.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        movie.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={movie.completed}
        onChange={togglewatch}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isMovieEditable ? "border-black/10 px-2" : "border-transparent"
        } ${movie.completed ? "line-through" : ""}`}
        value={movieMsg}
        onChange={(e) => setMovieMsg(e.target.value)}
        readOnly={!isMovieEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (movie.completed) return;

          if (isMovieEditable) {
            editMovie();
          } else setIsMovieEditable((prev) => !prev);
        }}
        disabled={movie.completed}
      >
        {isMovieEditable ? "📁" : "✏️"}
      </button>
      {/* Delete movie Button */}
      <button
        className="inline-flex w-8 h-8   rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteMovie(movie.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default MovieItem;
