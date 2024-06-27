import { createContext, useContext } from "react";

export const WatchListContext = createContext({
  movies: [
    {
      id: 1,
      movie: " movie names ",
      completed: true,
    },
  ],

  addMovie: (movie) => {},
  updateMovie: (id, moovie) => {},
  deleteMovie: (id) => {},
  toggleWatched: (id) => {},
});

export const useMovieWatchList = () => {
  return useContext(WatchListContext);
};

export const WatchListProvider = WatchListContext.Provider;
