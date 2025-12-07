import React, { useEffect, useState, useMemo } from "react";
import { fetchHorror, fetchAnimation } from "./db/db.js";
import MovieCard from "./MovieCard";
import VideoPlayer from "./VideoPlayer";
import { Link } from "react-router-dom";
const PAGE_SIZE = 12;

export default function Home() {
  const [category, setCategory] = useState("horror"); 
  const [allMovies, setAllMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.   getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function load() {
      try {
        const data = category === "horror" ? await fetchHorror() : await fetchAnimation();

        const normalized = data.map((m) => ({
          ...m,
          title: m.title || m.name || m.movie || "",
        }));
        setAllMovies(normalized);
        setPage(1);
      } catch (err) {
        console.error(err);
        setAllMovies([]);
      }
    }
    load();
  }, [category]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allMovies;
    const q = query.toLowerCase();
    return allMovies.filter((m) => (m.title || "").toLowerCase().includes(q));
  }, [allMovies, query]);


  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  function toggleFavorite(movie) {
    const exists = favorites.some((f) => f.id === movie.id || f.title === movie.title);
    let next;
    if (exists) next = favorites.filter((f) => !(f.id === movie.id || f.title === movie.title));
    else next = [movie, ...favorites];
    setFavorites(next);
    localStorage.setItem("favorites", JSON.stringify(next));
  }

  function openMovie(movie) {
    setSelectedMovie(movie);
    setOpenPlayer(true);
  }

  return (
    <div className="page">
      <div className="controls">
        <div className="tabs">
          <button className={category === "horror" ? "active" : ""} onClick={() => setCategory("horror")}>Horror</button>
          <button className={category === "animation" ? "active" : ""} onClick={() => setCategory("animation")}>Animation</button>
        </div>

        <div className="tabs">
         <button className="logout-text"> <Link to="/">Logout</Link></button>
        </div>
      </div>

      <section className="grid">
        {paged.length === 0 ? (
          <div className="empty">No movies found.</div>
        ) : (
          paged.map((m, idx) => (
            <MovieCard
              key={m.id ?? `${m.title}-${idx}`}
              movie={m}
              onSelect={openMovie}
              isFav={favorites.some((f) => (f.id && f.id === m.id) || f.title === m.title)}
              toggleFav={toggleFavorite}
            />
          ))
        )}
      </section>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>

        <div className="pages">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "page active" : "page"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>

      <VideoPlayer open={openPlayer} onClose={() => setOpenPlayer(false)} title={selectedMovie?.title || ""} />
    </div>
  );
}
