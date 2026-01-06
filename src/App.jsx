import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreationPage from "./pages/CreationPage";
import LoginPage from "./pages/LoginPage";
import MyBooks from "./pages/MyBooks";
import BookSearch from "./pages/BookSearch";
import Operation from "./pages/Operation";
import IssueReturn from "./pages/IssueReturn";
import OverdueList from "./pages/OverdueList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/operaation" element={<Operation />} />
        <Route path="/students/my-books" element={<MyBooks />} />
        <Route path="/students/search" element={<BookSearch />} />
        <Route path="/issuereturn" element={<IssueReturn />} />
        <Route path="/Overduelist" element={<OverdueList />} />
      </Routes>
    </>
  );
};

export default App;
