// src/components/BookList.jsx
import React from "react";
import BookItem from "./BookItem";

export default function BookList({
  books,
  onToggle,
  onDelete,
  onEdit,
  emptyText,
}) {
  if (!books.length) {
    return <p className="empty-text">{emptyText}</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
