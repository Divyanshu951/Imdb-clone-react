import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams({
      q: query,
      page: 1,
    });

    navigate(`/search?${params.toString()}`);
  }

  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <input
          style={{ fontSize: "32px" }}
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </nav>
  );
}

export default NavBar;
