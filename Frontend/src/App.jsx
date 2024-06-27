import { useState, useEffect } from "react";
import { WatchListProvider } from "./contexts";
import MovieForm from "./components/MovieForm";
import MovieItem from "./components/MovieItem";

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies((oldMovies) => [{ id: Date.now(), ...movie }, ...oldMovies]);
  };

  const updateMovie = (id, movie) => {
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) => (prevMovie.id === id ? movie : prevMovie))
    );
  };

  const deleteMovie = (id) => {
    setMovies((prevMovies) =>
      prevMovies.filter((prevMovie) => prevMovie.id !== id)
    );
  };

  const toggleWatched = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) =>
        prevMovie.id === id
          ? { ...prevMovie, completed: !prevMovie.completed }
          : prevMovie
      )
    );
  };

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));

    if (movies && movies.length > 0) {
      setMovies(movies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <WatchListProvider
      value={{ movies, addMovie, updateMovie, toggleWatched, deleteMovie }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-[#cecefd]">
          <h1 className="text-[26px] font-bold text-center mb-8 mt-2">
            Manage Your Movie
          </h1>
          <div className="mb-4">
            {/* Movies form goes here */}

            <MovieForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add MovieItem here */}
            {movies.map((movie) => (
              <div key={movie.id} className="w-full">
                <MovieItem movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </WatchListProvider>
  );
}

export default App;
