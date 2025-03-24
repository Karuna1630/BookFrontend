import { useState } from 'react';

import Footer from '../../Components/Footer';
import Navbar from '../../Components/navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='bg-gradient-to-r  from-blue-50 to-blue-200'>
        <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-5 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
      
      {submitted ? (
        <div className="text-green-600 text-center p-4 bg-green-50 rounded">
          Thank you for your message! We&apos;ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      )}
      
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Email: support@bookbazaar.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;