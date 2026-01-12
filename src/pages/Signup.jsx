import { Link } from 'react-router';
import './Auth.css'

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-curve"></div>
      <div className="auth-card">
        <img src="/logo.png" alt="School Logo" className="logo" />

        <input type="text" placeholder="Full name" />
        <input type="text" placeholder="ID Number" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Sign up</button>

        <p className="auth-text">
          Already have an account? {" "}
          <Link to="/">
           <span>Sign in</span>
          </Link>
          
        </p>
      </div>
    </div>
  );
}

export default Signup;
