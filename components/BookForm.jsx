// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";

export default function BookForm({
  onAdd,
  onUpdate,
  onCancelEdit,
  editingBook,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [publisher, setPublisher] = useState("");

  // helper format tanggal: ISO (yyyy-mm-dd) <-> dd/mm/yyyy
  const toDisplayDate = (ddmmyyyy) => {
    if (!ddmmyyyy) return "";
    const [d, m, y] = ddmmyyyy.split("/");
    return `${y}-${m}-${d}`;
  };

  const toLabelDate = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
  };

  // isi form saat edit
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title || "");
      setAuthor(editingBook.author || "");
      setPublisher(editingBook.publisher || "");
      setPublicationDate(toDisplayDate(editingBook.publicationDate || ""));
    } else {
      setTitle("");
      setAuthor("");
      setPublisher("");
      setPublicationDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const bookData = {
      title: title.trim(),
      author: author.trim() || "Tanpa penulis",
      publicationDate: toLabelDate(publicationDate),
      publisher: publisher.trim() || "Tidak diketahui",
      isComplete: editingBook ? editingBook.isComplete : false,
    };

    if (editingBook) {
      onUpdate({ ...editingBook, ...bookData });
    } else {
      onAdd(bookData);
    }

    setTitle("");
    setAuthor("");
    setPublicationDate("");
    setPublisher("");
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Publication Date (YYYY-MM-DD)</label>
        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Publisher</label>
        <input
          type="text"
          placeholder="Publisher name"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <button type="submit" className="btn-primary">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
        {editingBook && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
