import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../component/MovieCard";

function SearchResult() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true to prevent UI flash
  const [error, setError] = useState("");
  const { query } = useParams();

  useEffect(() => {
    // STEP 1: Create an AbortController to cancel fetches if user navigates away fast
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`,
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        if (data.Response === "True") {
          setMovieList(data.Search);
        } else {
          setError(data.Error);
          setMovieList([]);
        }
      } catch (err) {
        // Ignore AbortErrors (they are intentional when unmounting)
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    // STEP 2: Cleanup function runs when component unmounts
    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {query}</p>
      <div style={styles.grid}>
        {isLoading && <h2>Loading movies...</h2>}
        {!isLoading && error && <h2>{error}</h2>}
        {!isLoading &&
          !error &&
          movieList.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px",
    padding: "20px",
    justifyItems: "center",
  },
};

export default SearchResult;
