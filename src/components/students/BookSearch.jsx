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
import { useState, useMemo, useEffect } from "react";
import logoImage from "../../Images/School Logo.png";
import backgroundImage from "../../Images/Background.png";
import { getAllBooks, searchBooks } from "../../services/api";




export default function BookSearchPage() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  
  

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      setError(""); 
      const response = await getAllBooks();
      // Wrap single object in array if needed
      setBooks(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim() === "") {
      fetchAllBooks();
      return;
    }
  
    try {
      setError("");
      setLoading(true);
      const response = await searchBooks(value);
      setBooks(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };
  
  
  const groupedBooks = useMemo(() => {
    const groups = {};
    if (!books || books.length === 0) return groups;
  
    books.forEach((book) => {
      const category = book.category?.trim() || "Uncategorized";
      if (!groups[category]) groups[category] = [];
      groups[category].push(book);
    });
  
    return groups;
  }, [books]);
  
  
  
  

  return (
    <div className="min-h-screen bg-[#00E5FF] font-sans">
      {/* --- Header with Background --- */}
      <div 
        className="relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
>
        <div className="absolute inset-0 bg-linear-to-b from-cyan-400/80 to-blue-500/30 backdrop-blur-sm"></div>
        
        <div className="relative z-10 p-6">
          <button className="text-white mb-4">
            {/* <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg> */}
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Image */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-900 overflow-hidden">
                <img 
                  src={logoImage}
                  alt="Lead City University Logo"
                  className="w-full h-full object-contain p-1" 
                />
              </div>
              <h1 className="text-4xl font-extrabold text-black tracking-tight">Books</h1>
            </div>

            {/* Search Bar Pill */}
            <div className="relative flex-1 max-w-50 ml-4">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/70 backdrop-blur-md py-2.5 px-10 rounded-full text-sm placeholder-gray-500 focus:outline-none shadow-inner text-black"
              />
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7-0 11-14 0 7 7-0 0114 0z" /></svg>
              <svg className="absolute right-3 top-3 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* --- Alphabet Navigation Strip --- */}
      <div className="flex items-center overflow-x-auto py-4 px-4 no-scrollbar whitespace-nowrap">

      </div>

      {loading && <div className="text-center mt-10">Loading books...</div>}
{error && <div className="text-center mt-10 text-red-600">{error}</div>}



      {/* --- Grouped Results --- */}
      <div className="px-4 pb-12">
      {Object.keys(groupedBooks).length > 0 ? (
  Object.keys(groupedBooks).sort().map((category) => (
    <div key={category} className="mb-10">
      <h2 className="text-3xl font-bold text-white px-2 mb-4">
        {category}
      </h2>

      {groupedBooks[category].map((book) => (
        <div
          key={book.id}
          className="flex justify-between items-end py-4 border-b border-gray-400/40 px-2"
        >
          <div>
            <h3 className="text-lg font-bold text-red-900 underline cursor-pointer">
              {book.title}
            </h3>
            <p className="text-sm text-black italic">
              {book.author}
            </p>
          </div>

          <p className="text-sm font-bold text-black">
            Available ({book.available})
          </p>
        </div>
      ))}
    </div>
  ))
) : (
  <div className="text-center mt-20 text-black/50 font-medium">
    No books available
  </div>
)}

      </div>
    </div>
  );
}