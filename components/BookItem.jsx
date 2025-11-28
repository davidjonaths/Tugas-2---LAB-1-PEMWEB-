// src/components/BookItem.jsx
import React from "react";

export default function BookItem({ book, onToggle, onDelete, onEdit }) {
  const publisherLabel = book.publisher || "Tidak diketahui";
  const dateLabel = book.publicationDate || "-";

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-meta">
          {book.author} • {dateLabel} • {publisherLabel}
        </p>
        <p className={`book-status ${book.isComplete ? "done" : "ongoing"}`}>
          {book.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"}
        </p>
      </div>

      <div className="book-actions">
        <button
          className="btn-secondary"
          onClick={() => onToggle(book.id)}
        >
          {book.isComplete ? "Tandai belum selesai" : "Tandai selesai"}
        </button>
        <button
          className="btn-secondary"
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
        <button
          className="btn-danger"
          onClick={() => onDelete(book.id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
