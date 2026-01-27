import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import StudentSignup from "./pages/StudentSignup";
import StaffSignup from "./pages/StaffSignup";

import MyBooks from "./components/students/MyBooks";
import BookSearch from "./components/students/BookSearch";
import Operation from "./components/staff/Operation";
import IssueReturn from "./components/staff/IssueReturn";
import OverdueList from "./components/staff/OverdueList";
import Borrowed from "./components/staff/Borrowed";
import Borrowers from "./components/staff/Borrowers";
import Header from "./components/staff/Header";
import BookDetails from "./components/students/BookDetails";
import MessageCard from "./pages/MessageCard";
import Dashboard from "./components/Dashboard";
import AddBook from "./components/staff/AddBook";


const App = () => {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/staff" element={<StaffSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/creation" element={<CreationPage />} />
        <Route path="/operation" element={<Operation />} />
        <Route path="/students/my-books" element={<MyBooks />} />
        <Route path="/students/search" element={<BookSearch />} />
        <Route path="/issuereturn" element={<IssueReturn />} />
        <Route path="/overduelist" element={<OverdueList />} />
        <Route path="/borrowed" element={<Borrowed />} />
        <Route path="/borrowers" element={<Borrowers />} />
        <Route path="/header" element={<Header />} />
      </Routes>
        <Route path="/book/:id" element={<BookDetails />} />

      </Routes> */}
<Routes>
  <Route path="/messagecard" element={<MessageCard />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/addbooks" element={<AddBook />} />
  <Route path="/" element={<LandingPage />} />
  <Route path="/signup/student" element={<StudentSignup />} />
  <Route path="/signup/staff" element={<StaffSignup />} />
  <Route path="/login" element={<LoginPage />} />
  {/* <Route path="/creation" element={<CreationPage />} /> */}
  <Route path="/operation" element={<Operation />} />
  <Route path="/students/my-books" element={<MyBooks />} />
  <Route path="/students/search" element={<BookSearch />} />
  <Route path="/issuereturn" element={<IssueReturn />} />
  <Route path="/overduelist" element={<OverdueList />} />
  <Route path="/borrowed" element={<Borrowed />} />
  <Route path="/borrowers" element={<Borrowers />} />
  <Route path="/header" element={<Header />} />
  <Route path="/bookdetails" element={<BookDetails />} />
</Routes>
    </>
  );
};

export default App;
