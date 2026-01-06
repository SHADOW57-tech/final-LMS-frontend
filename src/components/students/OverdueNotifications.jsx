import { useMemo } from "react";
// import "./OverdueNotifications.css";

// Placeholder mock borrow data for overdue calculation
const mockBorrowRecords = [
  {
    id: 1,
    studentId: 1,
    bookTitle: "Clean Code",
    author: "Robert C. Martin",
    dueDate: "2024-12-01",
  },
  {
    id: 2,
    studentId: 1,
    bookTitle: "Discrete Mathematics",
    author: "Rosen",
    dueDate: "2023-10-15",
  },
];

const OverdueNotifications = ({ studentId = 1 }) => {
  const today = new Date();

  const overdueItems = useMemo(
    () =>
      mockBorrowRecords.filter(
        (r) => r.studentId === studentId && new Date(r.dueDate) < today
      ),
    [studentId, today]
  );

  if (overdueItems.length === 0) {
    return (
      <div className="overdue-card overdue-card--empty">
        <h3 className="overdue-title">Overdue Notices</h3>
        <p className="overdue-empty-text">
          You currently have no overdue books. Keep up the good work!
        </p>
      </div>
    );
  }

  return (
    <div className="overdue-card">
      <h3 className="overdue-title">
        Overdue Notices
        <span className="overdue-count-badge">{overdueItems.length}</span>
      </h3>
      <p className="overdue-subtitle">
        These are placeholder notifications to demo the overdue workflow.
      </p>
      <ul className="overdue-list">
        {overdueItems.map((item) => (
          <li key={item.id} className="overdue-list-item">
            <div className="overdue-book-main">
              <span className="overdue-book-title">{item.bookTitle}</span>
              <span className="overdue-book-author">by {item.author}</span>
            </div>
            <div className="overdue-meta">
              <span className="overdue-label">Due</span>
              <span className="overdue-date">{item.dueDate}</span>
              <span className="overdue-pill">Overdue</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverdueNotifications;

