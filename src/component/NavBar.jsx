function NavBar({ query, setQuery, handleSubmit }) {
  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <input
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
