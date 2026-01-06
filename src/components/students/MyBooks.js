import { useState, useEffect } from 'react';
import { books, borrowRecords } from '../MockData/mockData';
import './MyBooks.css';

const MyBooks = () => {
    const studentId = 1; // Mock current user

    // Simulate loading data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fake API delay
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const myRecords = borrowRecords.filter(r => r.studentId === studentId && !r.returned);

    const getBookDetails = (id) => books.find(b => b.id === id);

    if (loading) {
        return <div className="my-books-loading">Loading your books...</div>;
    }

    return (
        <div className="my-books-container">
            <h2 className="my-books-title">My Borrowed Books</h2>

            {myRecords.length === 0 ? (
                <p>You have no borrowed books.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="books-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myRecords.map(record => {
                                const book = getBookDetails(record.bookId);
                                const isOverdue = new Date(record.dueDate) < new Date();
                                return (
                                    <tr key={record.id} className={isOverdue ? 'row-overdue' : ''}>
                                        <td>{book?.title || 'Unknown Title'}</td>
                                        <td>{book?.author || 'Unknown Author'}</td>
                                        <td className={isOverdue ? 'text-overdue' : ''}>
                                            {record.dueDate} {isOverdue && '(Overdue)'}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${isOverdue ? 'status-overdue' : 'status-active'}`}>
                                                {isOverdue ? 'Overdue' : 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBooks;
