import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { Poster, Title, Type, Year, imdbID } = movie;

  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      borderRadius: "8px",
      overflow: "hidden",
      width: "220px",
      transition: "transform 0.2s ease",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
    },
    posterContainer: {
      position: "relative",
      width: "100%",
      height: "300px",
      overflow: "hidden",
    },
    poster: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
    },
    plusIcon: {
      position: "absolute",
      top: "10px",
      left: "10px",
      background: "rgba(0,0,0,0.7)",
      borderRadius: "4px",
      padding: "4px",
      display: "flex",
      zIndex: 2,
    },
    content: {
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      margin: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "#f5c518", // IMDb Yellow accent
    },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "13px",
      color: "#b3b3b3",
    },
    typeBadge: {
      textTransform: "uppercase",
      fontSize: "10px",
      letterSpacing: "1px",
      background: "#333",
      padding: "2px 6px",
      borderRadius: "4px",
    },
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      onClick={() => navigate(`/movie/${imdbID}`)}
    >
      <div style={styles.posterContainer}>
        <div style={styles.plusIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <img
          src={
            Poster !== "N/A"
              ? Poster
              : "https://placehold.co/300x450?text=No+Poster"
          }
          alt={Title}
          style={styles.poster}
        />
        <div style={styles.overlay} />
      </div>

      <div style={styles.content}>
        <h2 style={styles.title} title={Title}>
          {Title}
        </h2>
        <div style={styles.metaRow}>
          <span>{Year}</span>
          <span style={styles.typeBadge}>{Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
