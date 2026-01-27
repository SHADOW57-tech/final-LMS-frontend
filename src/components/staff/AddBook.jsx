import { useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    author: "",
    year: "",
    summary: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      category: "General",
      status: "Available",
      year: formData.year,
    };

    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    localStorage.setItem("books", JSON.stringify([...storedBooks, newBook]));

    // Reset form
    setFormData({
      title: "",
      isbn: "",
      author: "",
      year: "",
      summary: "",
    });

    alert("Book added successfully!");
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Add Books</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="title"
              placeholder="Book Name"
              className="input"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              name="isbn"
              placeholder="ISBN / ISSN"
              className="input"
              value={formData.isbn}
              onChange={handleChange}
            />
            <input
              name="author"
              placeholder="Author(s)"
              className="input"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              name="year"
              placeholder="Publication Year"
              className="input"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <textarea
            rows="5"
            name="summary"
            placeholder="Abstract / Summary"
            className="input resize-none"
            value={formData.summary}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Book
          </button>
        </form>

        {/* Floating Button */}
        <button
          type="submit"
          className="fixed bottom-8 right-8 w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center shadow cursor-pointer hover:bg-gray-300"
        >
          <Plus size={26} />
        </button>
      </div>
    </DashboardLayout>
  );
};

export default AddBook;
