import { useState } from "react";
import NavBar from "../component/NavBar";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search/${query}`);
    setQuery("");
  }

  return (
    <div>
      <NavBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
      <Link to="/about">About</Link>
    </div>
  );
}

export default Home;
