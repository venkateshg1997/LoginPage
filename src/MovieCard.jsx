import React from "react";


 
const placeholderUrl = "/mnt/data/65feb028-cd70-4a64-8c0d-3d0f35f62707.png";

export default function MovieCard({ movie, onSelect, isFav, toggleFav }) {

  const poster = movie.posterURL || movie.poster || movie.image || placeholderUrl;

  return (
    <div className="card">
      <div className="poster-wrap" onClick={() => onSelect(movie)}>
        <img src={poster} alt={movie.title || movie.name} className="poster" />
        <div className="play-overlay">▶</div>
      </div>

      <div className="card-body">
        <div className="title-row">
          <h4 className="title">{movie.title || movie.name}</h4>
          <button
            className={`fav-btn ${isFav ? "fav-on" : ""}`}
            onClick={() => toggleFav(movie)}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>

        <p className="meta">{movie.year || movie.releaseDate || ""}</p>
        <p className="overview">{(movie.plot || movie.description || movie.overview || "").slice(0, 140)}{(movie.plot || movie.description || movie.overview || "").length > 140 ? "…" : ""}</p>
      </div>
    </div>
  );
}
