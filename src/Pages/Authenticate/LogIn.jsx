import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { validationRules } from './validation'; // Import validation rules

const Login = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    // Implement Google Sign-In logic here
  };

  return (
    <>
      <Navbar />
      <div className='h-[calc(100vh-120px)] flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-200 '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

          {/* Form with validation */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
              <input 
                {...register("email", validationRules.email)} // Use the imported validation rules
                type="email"
                name="email"
                id="email"
                placeholder='Email Address'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
              />
              {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>} {/* Show error message */}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
              <input 
                {...register("password", validationRules.password)} // Use the imported validation rules
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
              />
              {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>} {/* Show error message */}
            </div>

            {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

            <div>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
            </div>
          </form>

          <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>

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
