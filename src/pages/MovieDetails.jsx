import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Start true
  const [error, setError] = useState("");
  const { imdbID } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch movie details");

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovieDetails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(`Something went wrong: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();

    return () => controller.abort();
  }, [imdbID]);

  const {
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Poster,
    Metascore,
    imdbRating,
    imdbVotes,
    Awards,
    BoxOffice,
  } = movieDetails;

  if (isLoading) return <h1 style={{ color: "white" }}>Loading...</h1>;
  if (error) return <h1 style={{ color: "white" }}>{error}</h1>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.heroSection}>
        <div style={styles.headerTop}>
          <div style={styles.titleBlock}>
            <h1 style={styles.mainTitle}>{Title}</h1>
            <div style={styles.subMeta}>
              <span>{Year}</span>
              <span>{Rated}</span>
              <span>{Runtime}</span>
            </div>
          </div>
          <div style={styles.ratingBlock}>
            {/* Rating UI kept identical to yours */}
            <div style={styles.ratingItem}>
              <div style={styles.ratingLabel}>IMDb RATING</div>
              <div style={styles.imdbScore}>
                <span style={{ color: "#f5c518" }}>★</span>
                {imdbRating}
                <span style={{ color: "#666", fontSize: "14px" }}>/10</span>
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>{imdbVotes}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <img
          src={Poster !== "N/A" ? Poster : "https://placehold.co/300x450"}
          alt={Title}
          style={styles.poster}
        />
        <div style={styles.detailsSide}>
          <div style={styles.genrePills}>
            {(Genre ? Genre.split(", ") : []).map((g) => (
              <span key={g} style={styles.pill}>
                {g}
              </span>
            ))}
          </div>
          <p style={styles.plot}>{Plot}</p>
          <div style={styles.infoRow}>
            <span style={styles.label}>Director</span>
            <span style={styles.value}>{Director}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Writers</span>
            <span style={styles.value}>{Writer}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Stars</span>
            <span style={styles.value}>{Actors}</span>
          </div>
          <div style={{ ...styles.infoRow, border: "none", color: "#f5c518" }}>
            <span style={{ marginRight: "10px" }}>🏆</span>
            <span>{Awards}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles moved outside component
const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: "0 0 40px 0",
  },
  heroSection: {
    padding: "40px 10% 20px 10%",
    backgroundColor: "#1a1a1a",
    borderBottom: "1px solid #333",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "20px",
  },
  titleBlock: { display: "flex", flexDirection: "column", gap: "8px" },
  mainTitle: { fontSize: "48px", margin: 0, fontWeight: "400" },
  subMeta: { fontSize: "14px", color: "#b3b3b3", display: "flex", gap: "15px" },
  ratingBlock: { display: "flex", gap: "30px" },
  ratingItem: { textAlign: "center" },
  ratingLabel: {
    fontSize: "12px",
    color: "#b3b3b3",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  imdbScore: {
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  mainContent: {
    display: "flex",
    padding: "20px 10%",
    gap: "40px",
    marginTop: "20px",
  },
  poster: {
    width: "300px",
    borderRadius: "4px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  detailsSide: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  genrePills: { display: "flex", gap: "10px" },
  pill: {
    border: "1px solid #555",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  plot: {
    fontSize: "18px",
    lineHeight: "1.6",
    borderBottom: "1px solid #333",
    paddingBottom: "20px",
  },
  infoRow: {
    display: "flex",
    padding: "12px 0",
    borderBottom: "1px solid #333",
    fontSize: "16px",
  },
  label: { fontWeight: "bold", width: "100px", color: "#ffffff" },
  value: { color: "#5799ef", flex: 1 },
};

export default MovieDetails;
