import { useState, useEffect } from "react";

const HomePage = () => {
  // Mock data for borrowed books
  const mockData = [
    {
      bookTitle: "The Great Gatsby",
      dueDate: new Date("2023-12-15"),
    },
    {
      bookTitle: "To Kill a Mockingbird",
      dueDate: new Date("2023-11-30"),
    },
  ];

  const [books, setBooks] = useState(mockData);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [overdueBooks, setOverdueBooks] = useState([]);

  // Function to handle adding a new borrowed book
  const handleAddBook = () => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        bookTitle: newBookTitle,
        dueDate: newDueDate || new Date(),
      },
    ]);
  };

  const handleBookNameChange = (event) => {
    setNewBookTitle(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setNewDueDate(new Date(event.target.value));
  };

  //Function to handle overdue books notification
  const handleOverdueNotification = () => {
    const today = new Date();
    for (const book of books) {
      if (new Date(book.dueDate) < today) {
        setOverdueBooks((prevOverdueBooks) => [...prevOverdueBooks, book]);
      }
    }
  };

  useEffect(() => {
    // handleOverdueNotification();
  }, [books]);

  return (
    <>
      <div>
        {overdueBooks.length > 0 && (
          <div>
            <h1>Overdue Books Notification</h1>
            {overdueBooks.map((book, index) => (
              <div key={index}>
                <p>
                  {book.bookTitle} is overdue! Due Date:{" "}
                  {new Date(book.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <form>
        <h1>Borrowed a Book</h1>
        <div>
          <label>Book Name: </label>
          <input
            type="text"
            placeholder="Book Name"
            value={newBookTitle}
            onChange={handleBookNameChange}
          />
        </div>
        <input type="text" placeholder="Book Name" />
        <input
          type="date"
          value={newDueDate.toLocaleString()}
          onChange={handleDueDateChange}
        />
        <button type="submit" onSubmit={handleAddBook}>
          Borrow Book
        </button>
      </form>
      <div>
        <h2>Borrowed Books List</h2>
        {books.map((book, index) => (
          <div key={index}>
            <p>{book.bookTitle}</p>
            <p>Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
