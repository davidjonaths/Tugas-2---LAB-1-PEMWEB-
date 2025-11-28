// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label>Cari buku berdasarkan judul</label>
      <input
        type="text"
        placeholder="Ketik judul buku..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
