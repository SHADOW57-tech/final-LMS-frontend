import React, { useEffect, useState } from "react";
import mockBooks from "../students/BookSearch/mockBooks";
import BookSearchResults from "../students/BookSearchResults";
import DashboardLayout from "../layout/DashboardLayout";

const ITEMS_PER_PAGE = 6;

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All",
    ...new Set(mockBooks.map((book) => book.category || "Uncategorized")),
  ];

  useEffect(() => {
    const searchText = query.toLowerCase();

    const filtered = mockBooks.filter((book) => {
      const title = (book.title || "").toLowerCase();
      const author = (book.author || "").toLowerCase();
      const isbn = String(book.isbn || "");

      const matchesSearch =
        title.includes(searchText) ||
        author.includes(searchText) ||
        isbn.includes(searchText);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });

    setResults(filtered);
    setCurrentPage(1);
  }, [query, category]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-5">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          📚 Book Search
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by title, author or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {!query && (
          <p className="text-center text-gray-400 mb-4">
            Start typing to search for books
          </p>
        )}

        {query && results.length === 0 && (
          <p className="text-center text-red-400 mb-4">
            No books found
          </p>
        )}

        <BookSearchResults results={paginatedResults} query={query} />

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default BookSearch;
