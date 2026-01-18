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
import MessageCard from "./pages/MessageCard";


const App = () => {
  return (
    <>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/messagecard" element={<MessageCard />} />
  <Route path="/signup/student" element={<StudentSignup />} />
  <Route path="/signup/staff" element={<StaffSignup />} />
  <Route path="/login" element={<LoginPage />} />
  {/* <Route path="/creation" element={<CreationPage />} /> */}
  <Route path="/operation" element={<Operation />} />
  <Route path="/students/my-books" element={<MyBooks />} />
  <Route path="/students/search" element={<BookSearch />} />
  <Route path="/issuereturn" element={<IssueReturn />} />
  <Route path="/overduelist" element={<OverdueList />} />
  
</Routes>
    </>
  );
};

export default App;