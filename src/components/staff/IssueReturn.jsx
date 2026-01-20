import React, { useState } from 'react';
import "./IssueReturn.css"


const IssueReturn = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    matricNumber: "",
    phoneNumber: "",
    email: "",
    course: "",
    level: "",
    bookTitle: "",
    bookIsbn: "",
    issueDate: "",
    returnDate: "",
  });
  
  const [successMessage, setSuccessMessage] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  

  const handleSubmit = () => {
    const { fullName, matricNumber, phoneNumber, email, course, level, bookTitle, bookIsbn, issueDate, returnDate } = formData;
  
    // Check all required fields
    if (!fullName || !matricNumber || !phoneNumber || !email || !course || !level || !bookTitle || !bookIsbn || !issueDate || !returnDate) {
      alert("Please fill in all required fields");
      return;
    }
  
    // Email validation
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    // Success
    setSuccessMessage(`Success: Book "${bookTitle}" issued to ${fullName}!`);
    console.log("Form submitted:", formData);
  
    // Reset only the book-related fields
    setFormData({
      ...formData,
      bookTitle: "",
      bookIsbn: "",
      issueDate: "",
      returnDate: "",
    });
  };
  
  
  

  return (
    
    <div className='mainform' style={{  border: '1px solid #ccc',  borderRadius: "20px", boxShadow: "inset 2px 2px 5px #888"}}>
       <div className='issue-logo'>
       <img
      src="/logo.png"
      alt="School Logo"
      className="mb-6 w-40 h-40 object-contain"
    />
       </div>
     <h2 style={{ borderBottom: "2px solid #D3D3D3", display: "block",  width: "auto"}}>ISSUE BOOK</h2>
     <br />
     
     <div className='info-cont'>
     <p className='subtitle'>STUDENT INFORMATION</p>
     {/* studnet information */}
      <div className='student-info' style={{  flexDirection: "row", gap: "20px", alignItems: "center", flexWrap: "wrap",}}>
        <input
        required
        className='input-field'
          style={{    borderRadius: "20px",   background: "#D3D3D3"}}
          placeholder="Full Name" 
          value={formData.fullName}
          onChange={(e) => { setFormData({...formData, fullName: e.target.value})
          setSuccessMessage("");
          }}
          
        />
        <input
        required
        className='input-field'
          style={{   borderRadius: "20px",   background: "#D3D3D3",}}
          placeholder="Matric Number" 
          value={formData.matricNumber}
          onChange={(e) => { setFormData({...formData, matricNumber: e.target.value})
          setSuccessMessage("");
          }}
        />
        <input
        required
        className='input-field'
          style={{    borderRadius: "20px",   background: "#D3D3D3"}}
          placeholder="Phone Number" 
          value={formData.phoneNumber}
          onChange={(e) => { setFormData({...formData, phoneNumber: e.target.value})
          setSuccessMessage("");
          }}
        />
        <input
        required
        className='input-field'
          style={{   borderRadius: "20px",   background: "#D3D3D3",}}
          placeholder="Email Address" 
          value={formData.email}
          onChange={(e) => { setFormData({...formData, email: e.target.value})
          setSuccessMessage("");
          }}
        />
        <input
        required
        className='input-field'
          style={{    borderRadius: "20px",   background: "#D3D3D3"}}
          placeholder="Course" 
          value={formData.course}
          onChange={(e) => { setFormData({...formData, course: e.target.value})
          setSuccessMessage("");
          }}
        />
        <input
        required
        className='input-field'
          style={{   borderRadius: "20px",   background: "#D3D3D3",}}
          placeholder="Level" 
          value={formData.level}
          onChange={(e) =>{ setFormData({...formData, level: e.target.value})
          setSuccessMessage("");
          }}
        /> 
      </div>
      <br />



      <p className='subtitle'>BOOK INFORMATION</p>
      {/* book information */}
      <div className='book-info' style={{  flexDirection: "column", gap: "20px",  flexWrap: "wrap",}}>
        <input
        required
        className="input-field2"
          style={{  fontSize: "14px",   borderRadius: "20px",   background: "#D3D3D3", }}
          placeholder="Book Title" 
          value={formData.bookTitle}
          onChange={(e) => { setFormData({...formData, bookTitle: e.target.value})
          setSuccessMessage("");
          }}
        />
        <input
        required
        className="input-field2"
          style={{  fontSize: "14px",  borderRadius: "20px",   background: "#D3D3D3",}}
          placeholder="Book ID / ISBN" 
          value={formData.bookIsbn}
          onChange={(e) => { setFormData({...formData, bookIsbn: e.target.value})
          setSuccessMessage("");
          }}
        />
      </div>
      <br />



      {/* issue date */}
      <p className='subtitle'>ISSUE & RETURN DATE</p>
      <div className='issue-info' style={{ flexDirection: "row", gap: "20px", alignItems: "center", flexWrap: "wrap",}}>
      <input required className='input-field' type="date" style={{ borderRadius: "20px", background: "#D3D3D3"}} placeholder="Issue Date" value={formData.issueDate} 
      onChange={(e) => {
        setFormData({ ...formData, issueDate: e.target.value });
        setSuccessMessage("");
      }}
      />

<input required className='input-field' type="date" style={{ color: "black", borderRadius: "20px", background: "#D3D3D3",}} placeholder="Return Date" value={formData.returnDate} 
onChange={(e) => {
  setFormData({ ...formData, returnDate: e.target.value });
  setSuccessMessage("");
}}
/>

      </div>

      <div style={{ textAlign: "center" }}>
      <button className="submit-btn" style={{   fontSize: "20px", borderRadius: "20px", background: "linear-gradient(to right, #22d3ee, #3b82f6)", color: "white"}} onClick={handleSubmit}>Issue Book</button>
      {/* <button style={{ border: "1px solid black" }} onClick={() => handleAction('return')}>Return</button> */}
      {successMessage && (
  <p style={{ color: "green", fontWeight: "bold", marginTop: "20px", textAlign: "center" }}>
    {successMessage}
  </p>
)}

      </div>
     </div>
     
    </div>
  );
};

export default IssueReturn;
