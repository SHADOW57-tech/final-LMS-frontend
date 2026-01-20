import { useState, useEffect } from 'react';
// import './MyBooks.css';
import OverdueNotifications from './OverdueNotifications';

const MyBooks = () => {
    const studentId = 1; // Mock current user

    // Simulate loading data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fake API delay
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Placeholder borrowed records for demo purposes
    const mockBorrowRecords = [
        {
            id: 1,
            studentId: 1,
            bookId: 1,
            title: 'Introduction to Computer Science',
            author: 'John Doe',
            dueDate: '2024-12-01',
            returned: false,
        },
        {
            id: 2,
            studentId: 1,
            bookId: 2,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            dueDate: '2023-10-15',
            returned: false,
        },
    ];

    const myRecords = mockBorrowRecords.filter(r => r.studentId === studentId && !r.returned);

    if (loading) {
        return <div className="my-books-loading">Loading your books...</div>;
    }

    return (
        <div className="my-books-container">
            <h2 className="my-books-title">My Borrowed Books</h2>

            {/* Placeholder overdue notifications workflow */}
            <OverdueNotifications studentId={studentId} />

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
                                // const book = getBookDetails(record.bookId);
                                const isOverdue = new Date(record.dueDate) < new Date();
                                return (
                                    <tr key={record.id} className={isOverdue ? 'row-overdue' : ''}>
                                        <td>{record?.title || 'Unknown Title'}</td>
                                        <td>{record?.author || 'Unknown Author'}</td>
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
