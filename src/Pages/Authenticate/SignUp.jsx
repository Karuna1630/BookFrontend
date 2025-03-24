import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import validation from "./registervalidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [iAgree, setIAgree] = useState(false); // Checkbox state for validation

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields including iAgree checkbox
    const validationErrors = validation({ name, email, password, confirmPassword, iAgree });
    setErrors(validationErrors);

    // If there are no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:3001/register', { name, email, password, confirmPassword })
        .then(result => {
          console.log('Registration Response:', result.data);
          if (result.data.success) {
            navigate('/login');
          } else if (result.data.error) {
            setErrors(prev => ({ ...prev, email: result.data.error }));
          }
        })
        .catch(error => {
          console.log('Registration Error:', error.response?.data || error);
          if (error.response?.data?.error) {
            setErrors(prev => ({ ...prev, email: error.response.data.error }));
          } else {
            setErrors(prev => ({ ...prev, email: 'Registration failed. Please try again.' }));
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-120px)] flex justify-center items-center py-8 bg-gradient-to-r from-blue-50 to-blue-200">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="iAgree"
                  name="iAgree"
                  checked={iAgree}
                  onChange={(e) => setIAgree(e.target.checked)} // Handling change
                  className="mr-2"
                />
                <span className="text-sm">I agree to the Terms and Conditions</span>
              </label>
              {errors.iAgree && <p className="text-red-500 text-sm">{errors.iAgree}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Redirect to Login */}
          <p className="align-baseline font-medium mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>

          {/* Google Sign-In Button */}
          <div className="mt-4">
            <button
              className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
