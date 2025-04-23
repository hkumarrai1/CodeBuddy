// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // for custom animation

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}
