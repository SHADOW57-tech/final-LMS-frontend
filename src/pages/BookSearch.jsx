
import React, { useState } from "react";
import mockBooks from "../components/students/BookSearch/mockBooks";
import BookSearchResults from "../pages/BookSearchResults";

const BookSearch = () => {
    const [query, setQuery] = useState("");      // user input
    const [results, setResults] = useState([]);  // filtered books

    const handleSearch = (e) => {
        e.preventDefault();

        // filter books by title OR author (case-insensitive)
        const filtered = mockBooks.filter(
            (book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Search Books</h2>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: "8px", width: "250px" }}
                />
                <button type="submit" style={{ marginLeft: "10px" }}>
                    Search
                </button>
            </form>

            <BookSearchResults results={results} />
        </div>
    );
};

export default BookSearch;
