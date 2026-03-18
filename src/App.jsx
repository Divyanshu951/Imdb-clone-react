import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import About from "./components/About";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default  */}
          <Route index element={<Navigate to="/home" replace />} />

          {/* Nested  */}
          <Route path="home" element={<Home />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="movie/:imdbID" element={<MovieDetails />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
