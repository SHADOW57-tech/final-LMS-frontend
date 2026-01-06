import React, { useState } from 'react';

const IssueReturn = () => {
  const [formData, setFormData] = useState({ studentId: '', bookId: '' });

  const handleAction = (action) => {
    if (!formData.bookId) return alert("Book ID is required");
    
    console.log(`Processing ${action} for:`, formData);
    alert(`Success: Book ${formData.bookId} ${action === 'issue' ? 'issued' : 'returned'}.`);
    
    setFormData({ studentId: '', bookId: '' });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Staff: Issue & Return</h2>
      
      <div>
        <input
          style={{ padding: "20px", margin: "5px", fontSize: "13px"}}
          placeholder="Student ID" 
          value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
        />
        <input
          style={{ padding: "20px", fontSize: "13px"}}
          placeholder="Book ID" 
          value={formData.bookId}
          onChange={(e) => setFormData({...formData, bookId: e.target.value})}
        />
        <br />
        <button style={{ margin: "20px"}} onClick={() => handleAction('issue')}>Issue</button>
        <button onClick={() => handleAction('return')}>Return</button>
      </div>
    </div>
  );
};

export default IssueReturn;
