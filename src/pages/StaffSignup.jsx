import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { staffSignup } from "../services/api";


const StaffSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
  lastName: "",
  phoneNumber: "",
  designation: "",
    idNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    // 1️⃣ Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.designation ||
      !formData.idNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
  
    // 2️⃣ Payload sent to backend
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      designation: formData.designation,
      idNumber: formData.idNumber,
      email: formData.email,
      password: formData.password,
      role: "staff",
    };
  
    // 3️⃣ API call
    try {
      const response = await staffSignup(payload);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
  
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Staff signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden relative">
  {/* Background semi-circle */}
  <div className="absolute inset-0">
    <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-sky-300 rounded-t-[50%]"></div>
  </div>

  <form
    onSubmit={handleSubmit}
    className="relative z-10 w-full max-w-md flex flex-col items-center px-6"
  >
    <img
      src="/logo.png"
      alt="Library Logo"
      className="mb-6 w-40 h-40 object-contain"
    />

    {error && (
      <div className="text-red-500 text-sm mb-4">
        {error}
      </div>
    )}

    <div className="md:w-full mb-4">
      <label className="block text-sm text-gray-700 mb-1">Full Name:</label>
      <input
        type="text"
        name="fullName"
        placeholder="Jane Smith"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
<div className="w-full mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
            />
          </div>
        </div>

    <div className="md:w-full mb-4">
      <label className="block text-sm text-gray-700 mb-1">ID Number:</label>
      <input
        type="text"
        name="idNumber"
        placeholder="STF12345"
        required
        value={formData.idNumber}
        onChange={handleChange}
        className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>

    <div className="md:w-full mb-4">
      <label className="block text-sm text-gray-700 mb-1">Email:</label>
      <input
        type="email"
        name="email"
        required
        placeholder="staff@example.com"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
    <div className="w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="08012345678"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
          />
        </div>

        <div className="w-full mb-4">
  <label className="block text-sm text-gray-700 mb-1">
    Designation:
  </label>

  <select
    name="designation"
    value={formData.designation}
    onChange={handleChange}
    required
    className="w-full px-5 py-3 rounded-lg border border-gray-200 
               focus:outline-none focus:ring-2 focus:ring-sky-400 
               bg-white"
    
  >
    <option value="">Select designation</option>
    <option value="lecturer">Lecturer</option>
<option value="assistant">Assistant</option>
<option value="librarian">Librarian</option>

  </select>
</div>


    <div className="md:w-full mb-4">
      <label className="block text-sm text-gray-700 mb-1">Password:</label>
      <input
        type="password"
        name="password"
        required
        placeholder="Min 6 characters"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>

    <div className="md:w-full mb-6">
      <label className="block text-sm text-gray-700 mb-1">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        required
        placeholder="Re-enter password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>

    <button
      type="submit"
      className="w-55 md:w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-300 mb-4"
    >
      Sign Up
    </button>

    <p className="text-sm text-gray-700">
      Already have an account?{" "}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-white font-semibold cursor-pointer hover:underline"
      >
        Sign in
      </button>
    </p>
  </form>
</div>

  );
};

export default StaffSignup;
