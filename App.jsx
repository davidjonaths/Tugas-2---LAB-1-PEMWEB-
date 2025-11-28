// src/App.jsx
import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const STORAGE_KEY = "BOOKSHELF_APP_DATA";

export default function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null); // buku yang sedang diedit

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...book,
      },
    ]);
  };

  const startEditBook = (book) => {
    setEditingBook(book);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  const updateBook = (updated) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    if (!window.confirm("Hapus buku ini?")) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleComplete = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, isComplete: !b.isComplete } : b
      )
    );
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const unreadBooks = filteredBooks.filter((b) => !b.isComplete);
  const readBooks = filteredBooks.filter((b) => b.isComplete);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Manager</h1>
        <p>Kelola koleksi bukumu.</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
          <BookForm
            key={editingBook ? editingBook.id : "new"}
            onAdd={addBook}
            onUpdate={updateBook}
            onCancelEdit={cancelEdit}
            editingBook={editingBook}
          />
        </section>

        <section className="section">
          <SearchBar value={search} onChange={setSearch} />
        </section>

        <section className="section section-grid">
          <div>
            <h2>Belum selesai dibaca</h2>
            <BookList
              books={unreadBooks}
              onToggle={toggleComplete}
              onDelete={deleteBook}
              onEdit={startEditBook}
              emptyText="Belum ada buku."
            />
          </div>

          <div>
            <h2>Selesai dibaca</h2>
            <BookList
              books={readBooks}
              onToggle={toggleComplete}
              onDelete={deleteBook}
              onEdit={startEditBook}
              emptyText="Belum ada buku selesai dibaca."
            />
          </div>
        </section>
      </main>
    </div>
  );
}
