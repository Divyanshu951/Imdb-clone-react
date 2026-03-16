import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../component/MovieCard";

// http://www.omdbapi.com/?apikey=${KEY}&s=${query}
const KEY = "6ce769c8";

function SearchResult() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [movieList, setMovieList] = useState([]);
  const { query } = useParams();

  useEffect(
    function () {
      async function fetchMovieList() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          );
          const data = await res.json();
          console.log(data);
          if (data.Response === "True") setMovieList(data.Search);
          else setError(data.Error);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchMovieList();
    },
    [query],
  );

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {query}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", // Adaptive columns
          gap: "30px",
          padding: "20px",
          justifyItems: "center",
        }}
      >
        {isLoading ? (
          <h1>Loading...</h1>
        ) : !error ? (
          movieList?.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </div>
  );
}

function SearchedMovie({ movie }) {
  return (
    <div>
      <h2>{movie.title}</h2>
    </div>
  );
}

export default SearchResult;
