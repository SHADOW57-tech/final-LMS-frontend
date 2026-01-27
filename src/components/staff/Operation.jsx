import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import initialBooks from "../../mockdata/Books";

function Operation() {
const [books, setBooks] = useState(() => {
  return JSON.parse(localStorage.getItem("books")) || initialBooks;
});
  const [search, setSearch] = useState("");
  const [deleteBook, setDeleteBook] = useState(null);

  // Filter books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Confirm delete
 const confirmDelete = () => {
  const updated = books.filter((b) => b.id !== deleteBook.id);
  setBooks(updated);
  localStorage.setItem("books", JSON.stringify(updated));
  setDeleteBook(null);
};


  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">
            Library Book List <span className="text-sm text-gray-500">(Staff Access)</span>
          </h2>

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-64"
          />
        </div>

        {/* TABLE (Desktop) */}
        <div className="hidden md:block bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.category}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setDeleteBook(book)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm">Author: {book.author}</p>
              <p className="text-sm">Category: {book.category}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    book.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {book.status}
                </span>
              </p>

              <button
                onClick={() => setDeleteBook(book)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteBook && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-sm">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-xl font-medium">
              Confirm Deletion
            </div>

            <div className="p-4 text-sm">
              Are you sure you want to remove
              <strong> "{deleteBook.title}"</strong>?
            </div>

            <div className="flex justify-end gap-3 px-4 pb-4">
              <button
                onClick={() => setDeleteBook(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Operation;
