
import React, { useState } from "react";
import "./StudentDashboard.css";

const books = [
  { title: "Quantum Physics", img: "https://picsum.photos/200?1" },
  { title: "Biography", img: "https://picsum.photos/200?2" },
  { title: "Applied Geophysics", img: "https://picsum.photos/200?3" },
  { title: "Biography", img: "https://picsum.photos/200?4" },
];

function StudentDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setOpen(false)}>✕</div>
        <div className="profile">
          <img src="https://i.pravatar.cc/100" alt="profile" />
          <h3>Barbecue Saint</h3>
          <p>UID: STUDENT_BY15</p>
        </div>

        <ul>
          <li>Profile</li>
          <li>Library</li>
          <li>Borrowed Books</li>
          <li>Downloads</li>
          <li>History</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>

        <button className="logout">Log Out</button>
      </div>

      {/* Top Bar */}
      <div className="topbar">
        <div className="menu" onClick={() => setOpen(true)}>☰</div>
        <img src="https://i.pravatar.cc/40" alt="avatar" />
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome Barbecue saint</h1>
        <h4>LCU/AB/12/34567</h4>
        <p className="quote">
          Read a thousand books, and your words will flow like a river; travel a thousand miles, and your feet will gain experience.
        </p>
        <span className="author">Sun Tzu</span>
      </div>

      {/* Continue Reading */}
      <div className="books-section">
        <h3>Continue Reading...</h3>
        <div className="books">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.img} alt={book.title} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
