import { useState } from "react";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { validationRules } from "./validation"; // Import validation rules

const Register = () => {
  const [message, setMessage] = useState("");
      
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const onSubmit = (data) => console.log(data);
        
  const handleGoogleSignIn = async () => {
    // Google sign in logic
  };

  return (
    <>
    <Navbar/>
    <div className='min-h-[calc(100vh-120px)] flex justify-center items-center py-8 bg-gradient-to-r from-blue-50 to-blue-200'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Full Name</label>
            <input 
              {...register("name", validationRules.name)} 
              type="text" name="name" id="name" placeholder='Full Name'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.name && <p className='text-red-500 text-xs italic'>{errors.name.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input 
              {...register("email", validationRules.email)} 
              type="email" name="email" id="email" placeholder='Email Address'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input 
              {...register("password", validationRules.password)} 
              type="password" name="password" id="password" placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirmPassword">Confirm Password</label>
            <input 
              {...register("confirmPassword", {
                ...validationRules.confirmPassword,
                validate: value => value === password || "Passwords do not match"
              })} 
              type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
            {errors.confirmPassword && <p className='text-red-500 text-xs italic'>{errors.confirmPassword.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='flex items-center'>
              <input 
                {...register("agreeTerms", validationRules.agreeTerms)} 
                type="checkbox" name="agreeTerms" id="agreeTerms"
                className='mr-2'
              />
              <span className='text-sm'>I agree to the Terms and Conditions</span>
            </label>
            {errors.agreeTerms && <p className='text-red-500 text-xs italic'>{errors.agreeTerms.message}</p>}
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>SignUP</button>
          </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>Haven&apos;t an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>

        {/* google sign in */}
        <div className='mt-4'>
          <button 
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
            <FaGoogle className='mr-2'/>
            Sign in with Google
          </button>
        </div>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;