import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SignupModal from "../components/SignupModal";
import "./Auth.css";
import { loginUser } from "../services/api";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await loginUser(formData);
  
      // Save token from backend
      localStorage.setItem("token", response.data.token);
  
      // Redirect after successful login
      navigate("/students/search");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login details");
    }
  };
  
  




  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-sky-300 rounded-t-[50%]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-6">
        <img
          src="/logo.png"
          alt="School Logo"
          className="mb-6 w-40 h-40 object-contain"
        />

{error && <p className="error-text">{error}</p>}


        <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-5 px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
        />

        <div className="relative w-full mb-8">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 pr-12 rounded-lg border 
               focus:outline-none focus:ring-2 focus:ring-sky-400
                text-gray-900 placeholder-gray-400  bg-white"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-4 flex items-center
               text-gray-400  focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-300 mb-4"
          type="submit"
          
        >
          Login
        </button>

        </form>

        <p className="text-sm text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => setIsModalOpen(true)}
            className="text-white font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>

      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Login;
