import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreationPage from "./pages/CreationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;