import {
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start">

        {/* Left Section - Company Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">Book Bazar</h3>
          <p className="text-gray-400 leading-relaxed">
            Connecting book lovers through a seamless marketplace for buying,
            selling, and exchanging books with trust and convenience.
          </p>
          <div className="flex space-x-4 mt-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
              <a key={index} href="#" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-lg">
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 flex justify-center">
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Section - Contact Info */}
        <div className="flex-1 flex justify-end">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" size={18} />
                <span className="text-gray-400">
                  Kanepokhari-7, Morang<br />Ramailo, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" size={18} />
                <span className="text-gray-400">+977 9812318626</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" size={18} />
                <span className="text-gray-400">karunagiri481@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-gray-700">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Book Bazar. All Rights Reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy, index) => (
              <a key={index} href="#" className="text-gray-500 hover:text-white transition-colors">
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
