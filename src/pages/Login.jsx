import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const userCredentials = JSON.parse(localStorage.getItem("users") ?? "[]");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleLoginCredentials = () => {
    for (const login of userCredentials) {
      if (login.email === newEmail && login.password === newPassword) {
        // Login successful
        setShowError(false);
        // Navigate to dashboard or home page
        navigate("/dashboard");
        return;
      }
    }
    setShowError(true);
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="edge-design1"></div>
        <div className="edge-design2"></div>
      </div>
      <div className="auth-curve"></div>
      <div className="auth-card">
        <img src="/logo.png" alt="School Logo" className="logo" />

        {showError && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            Invalid email or password.
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={handlePasswordChange}
        />

        <button className='login-button' type="button" onClick={handleLoginCredentials}>
          Login
        </button>

        <p className="auth-text">
          Don't have an account?{" "} 
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;