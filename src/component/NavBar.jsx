import React from "react";

function NavBar({
  isSearchbarVisible,
  onIsSearchbarVisible,
  query,
  setQuery,
  handleSubmit,
}) {
  return (
    <header className="header">
      <img
        src="https://movie-mate-ten.vercel.app/_next/static/media/moviemate-text.6b5f54e7.svg"
        alt=""
        className="logo"
      />

      {isSearchbarVisible && (
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for movies and series"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
      )}

      <div
        className="search"
        onClick={() => onIsSearchbarVisible((prev) => !prev)}
      >
        {!isSearchbarVisible ? (
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        ) : (
          <span>&#10006;</span>
        )}
      </div>
    </header>
  );
}

export default NavBar;
