import { Link } from 'react-router';
import './Auth.css'

function Login() {
  return (
    <div className="auth-container">
      <div className="container">
        <div className="edge-design1"></div>
        <div className="edge-design2"></div>
      </div>
      <div className="auth-curve"></div>
      <div className="auth-card">
        <img src="/logo.png" alt="School Logo" className="logo" />

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button className='login-button'>Login</button>

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

