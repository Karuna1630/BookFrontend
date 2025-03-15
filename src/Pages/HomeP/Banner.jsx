import logoImg from "./../../assets/logo.jpg";
import bannerImg from "./../../assets/banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-200 py-12 px-6 md:px-16  overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between w-full space-y-10 md:space-y-0">
        
        {/* Left Section - Logo & Text */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          {/* Logo */}
          <div className="flex justify-center md:justify-start items-center mb-6">
            <img
              src={logoImg}
              alt="Book Bazar Logo"
              className="h-16 w-16 rounded-full shadow-xl border-4 border-blue-600"
            />
            <h1 className="ml-4 text-5xl font-extrabold text-blue-600 tracking-wide transition-all">
              Book Bazar
            </h1>
          </div>

          {/* Title */}
          <h2 className="md:text-6xl text-4xl font-semibold mb-5 text-gray-800 leading-tight">
            New Releases This Week!
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-lg font-serif  leading-relaxed mb-6 px-4 md:px-0">
            Dive into the world of books with our latest collection. From <strong>bestsellers</strong> to <strong>hidden gems</strong>,
            explore thrilling novels, insightful self-help guides, and timeless classics—all curated for passionate readers.
          </p>

        <Link to="/Product">

                 {/* Subscribe Button */}
                 <button  className="bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out">
            Explore Books 📚
          </button>
        </Link>
 
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 w-full flex justify-end items-center p-4 rounded-lg">
          <img
            src={bannerImg}
            alt="New Books"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;
