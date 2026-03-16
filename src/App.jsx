// STEP 1: Import required routing components from react-router-dom
// BrowserRouter → Enables routing in the entire app
// Routes → Wraps all Route definitions
// Route → Defines individual route paths and their components

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// STEP 2: Import all page components that will be rendered for different URLs
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import About from "./component/About";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    // STEP 3: Wrap the entire application inside BrowserRouter
    // This activates client-side routing (SPA behavior)
    <BrowserRouter>
      {/* STEP 4: Define all application routes inside Routes */}
      <Routes>
        {/* STEP 5: Define the Home route (default landing page) */}
        {/* When URL is "/" → Homepage component renders */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="search/:query" element={<SearchResult />} />
        <Route path="movie/:imdbID" element={<MovieDetails />} />
        <Route path="/about" element={<About />} />

        {/* Define a fallback route for unknown URLs */}
        {/* If no route matches → PageNotFound component renders */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
FINAL NOTE:

This setup creates a Single Page Application (SPA):

1. Only one HTML file loads.
2. React switches components based on URL.
3. No full page refresh happens.
4. Navigation must use <Link> instead of <a> for SPA behavior.

*/
