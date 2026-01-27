import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { studentSignup } from "../services/api";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    matricNumber: "",
    entryYear: "",
    programDuration: "",
    programType: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.matricNumber ||
      !formData.entryYear ||
      !formData.programDuration ||
      !formData.programType ||
      !formData.department ||
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

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        matricNumber: formData.matricNumber,
        entryYear: formData.entryYear,
        programDuration: formData.programDuration,
        programType: formData.programType,
        department: formData.department,
        email: formData.email,
        password: formData.password,
        role: "student",
      };

      const response = await studentSignup(payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Student signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      {/* Background semi-circle */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[95%] bg-sky-300 rounded-t-[50%]"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-30 w-full max-w-md flex flex-col items-center px-6 pb-8"
      >
        <img
          src="/logo.png"
          alt="Library Logo"
          className="mb-6 w-40 h-40 object-contain"
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="md:w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Full Name:</label>
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

        <div className="md:w-full mb-4">
          
          <label className="block text-sm text-gray-700 mb-1">Matric Number:</label>
          <input
            type="text"
            name="matricNumber"
            placeholder="STU12345"
            required
            value={formData.matricNumber}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
          />
        </div>

        <div className="md:w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Course:</label>
          <div className="w-full mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Entry Year:</label>
              <input
                type="number"
                name="entryYear"
                placeholder="2024"
                required
                value={formData.entryYear}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Program Duration:</label>
              <input
                type="number"
                name="programDuration"
                required
                placeholder="4"
                value={formData.programDuration}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Program Type:</label>
          <input
            type="text"
            name="programType"
            placeholder="Undergraduate/Postgraduate"
            required
            value={formData.programType}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Department:</label>
          <input
            type="text"
            name="department"
            placeholder="Computer Science"
            required
            value={formData.department}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
          />
        </div>

        <div className="md:w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="student@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
          />
        </div>

        <div className="md:w-full mb-4">
          <label className="block text-sm text-gray-700 mb-1">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Min 6 characters"

              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="md:w-full mb-6">
          <label className="block text-sm text-gray-700 mb-1">Confirm Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-55 md:w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition duration-300 mb-4"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-700 mt-2">
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

export default StudentSignup;
