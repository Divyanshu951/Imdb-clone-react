import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function SearchResult() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true to prevent UI flash
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const query = searchParams.get("q") || "";

  const navigate = useNavigate();

  const updatePage = (newPage) => {
    const params = Object.fromEntries(searchParams);
    setSearchParams({
      ...params,
      page: newPage,
    });
  };

  useEffect(() => {
    // STEP 1: Create an AbortController to cancel fetches if user navigates away fast
    const controller = new AbortController();

    async function fetchMovies() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}&page=${currentPage}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        setTotalPages(Math.ceil(data.totalResults / 10));
        console.log(totalPages);

        if (data.Response === "True") {
          setMovieList(data.Search);
        } else {
          setError(data.Error);
          setMovieList([]);
        }
      } catch (err) {
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
  }, [query, currentPage, totalPages]);

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

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
        }}
      >
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span>{currentPage}</span>
        <button
          disabled={+currentPage === 1}
          onClick={() => updatePage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={totalPages === currentPage}
          onClick={() => updatePage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(220px, 1fr))",
    gap: "30px",
    padding: "20px",
    justifyItems: "center",
  },
};

export default SearchResult;
