import { useState } from "react";
import NavBar from "../component/NavBar";

function Home() {
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit() {
    console.log(query);
    setQuery("");
    setIsSearchbarVisible(false);
  }

  return (
    <div>
      <NavBar
        isSearchbarVisible={isSearchbarVisible}
        onIsSearchbarVisible={setIsSearchbarVisible}
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Home;
