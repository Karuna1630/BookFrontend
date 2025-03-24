import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import Footer from '../../Components/Footer';

import validation from './loginval';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/navbar';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validation({ email, password });
    setErrors(validationErrors);

    // If there are no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
          console.log(result);
          navigate('/');
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      <Navbar />
      <div className='h-[calc(100vh-120px)] flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-200 '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

          {/* Form with validation */}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
              <input

                type="email"
                name="email"
                id="email"
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
              <input

                type="password"
                name="password"
                id="password"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            </div>

            <div>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
            </div>
          </form>

          <p className='align-baseline font-medium mt-4 text-sm'>Haven&apos;t an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>

          {/* Google Sign-In Button */}
          <div className='mt-4'>
            <button
              className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
              <FaGoogle className='mr-2' />
              Sign in with Google
            </button>
          </div>

          <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
