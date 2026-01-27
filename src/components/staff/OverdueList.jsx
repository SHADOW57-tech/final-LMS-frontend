import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';

const OverdueList = () => {
  const overdueData = [
    { id: 1, title: "Psychology Of Money", student: "Dunsin", daysLate: 5 },
    { id: 2, title: "Java For Beginners", student: "Demilade", daysLate: 2 }
  ];

  return (
    <DashboardLayout>
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Staff: Overdue Books List</h2>
      <ul>
        {overdueData.map((book) => (
          <li key={book.id}>
            {book.title} - <strong>{book.student}</strong> 
            <span style={{ color: 'red' }}> ({book.daysLate} days late)</span>
          </li>
        ))}
      </ul>
    </div>
    </DashboardLayout>
  );
};

export default OverdueList;
