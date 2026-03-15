# IMDb Clone (React + React Router)

## Overview

This project is a React application inspired by IMDb. The goal is not to perfectly replicate IMDb's UI, but to **deeply practice React Router concepts used in real-world applications**.

The app displays movies, detailed information, cast, reviews, and allows users to search for movies using a public movie API.

---

# Tech Stack

- React
- React Router
- JavaScript
- CSS / Tailwind (optional)
- TMDB API (The Movie Database)

---

# Learning Goals

This project focuses heavily on mastering **React Router features**, including:

- Nested Routes
- Dynamic Routes
- Query Parameters
- Navigation State
- Protected Routes
- Layout Routes

---

# Application Routes

```
/
/movies
/movies/:movieId
/movies/:movieId/cast
/movies/:movieId/reviews
/search?q=batman
/actor/:actorId
/watchlist
/login
```

---

# Features

## Core Features

- Browse movies
- Movie details page
- Cast information
- Movie reviews
- Search movies
- Pagination or infinite scroll

## Additional Features

- Watchlist (stored in localStorage)
- Dark mode
- Skeleton loading UI
- Error handling
- 404 Not Found page

---

# React Router Concepts Practiced

## Nested Routes

```
/movies/:id
   ├ overview
   ├ cast
   └ reviews
```

Used with:

```
<Outlet />
```

---

## Dynamic Routes

```
/movies/:movieId
/actor/:actorId
```

Access parameters using:

```
useParams()
```

---

## Query Parameters

Example search URL:

```
/search?q=batman
```

Access query params using:

```
useSearchParams()
```

---

## Protected Routes

Example:

```
/watchlist
```

Redirect unauthenticated users to login using:

```
<Navigate />
```

---

## Navigation State

Passing state between routes:

```
<Link to="/movies/123" state={{ from: "search" }}>
```

Access with:

```
useLocation()
```

---

# Project Structure

```
src
 ├ pages
 │   ├ Home.jsx
 │   ├ Movies.jsx
 │   ├ MovieDetails.jsx
 │   ├ Cast.jsx
 │   ├ Reviews.jsx
 │   └ Search.jsx
 │
 ├ components
 │   ├ MovieCard.jsx
 │   ├ Navbar.jsx
 │   └ Rating.jsx
 │
 ├ routes
 │   └ router.jsx
 │
 ├ services
 │   └ api.js
```

---

# API

Movie data is fetched from **The Movie Database (TMDB)** API.

API provides:

- Movie list
- Movie details
- Cast information
- Reviews
- Search functionality

---

# Future Improvements

Possible upgrades:

- User authentication
- Backend for persistent watchlists
- Ratings and comments
- Server-side rendering
- Performance optimizations

---

# Goal of This Project

The main goal of this project is to **gain practical experience with real-world routing patterns in React applications** and build a solid foundation for frontend development.
