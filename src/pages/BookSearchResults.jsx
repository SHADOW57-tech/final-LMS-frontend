
import React from "react";

const BookSearchResults = ({ results }) => {
    if (results.length === 0) {
        return <p style={{ marginTop: "20px" }}>No books found.</p>;
    }

    return (
        <div style={{ marginTop: "20px" }}>
            {results.map((book) => (
                <div
                    key={book.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px"
                    }}
                >
                    <h4>{book.title}</h4>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Category:</strong> {book.category}</p>
                    <p><strong>Status:</strong> {book.available ? "Available" : "Borrowed"}</p>
                </div>
            ))}
        </div>
    );
};

export default BookSearchResults;
