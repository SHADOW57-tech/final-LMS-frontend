
import React from "react";
const highlightText = (text = "", query = "") => {
  if (!query) return text;

  const safeText = String(text);

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return safeText.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={index}
        className="bg-yellow-200 px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};


const BookSearchResults = ({ results = [], query = "" }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((book) => (
        <div
          key={book.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <img
            src={book.cover || "https://via.placeholder.com/150"}
            alt={book.title || "Book cover"}
            className="w-full h-40 object-cover rounded mb-3"
          />

          <h3 className="font-semibold text-lg">
            {highlightText(book.title, query)}
          </h3>

          <p className="text-sm text-gray-600">
            {highlightText(book.author, query)}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            ISBN: {highlightText(book.isbn, query)}
          </p>

          <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {book.category || "Uncategorized"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BookSearchResults;
