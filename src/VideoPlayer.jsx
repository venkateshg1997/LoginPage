import React from "react";


const SAMPLE_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function VideoPlayer({ open, onClose, title }) {
  if (!open) return null;

  return (
    <div className="video-overlay" onClick={onClose}>
      <div className="video-box" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <h3 className="video-title">{title}</h3>
        <video className="video-player" controls autoPlay>
          <source src={SAMPLE_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
