import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../Books/BookCard";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    fetch("/book.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevButtonRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextButtonRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="px-10 py-6 relative bg-gradient-to-r from-blue-50 to-blue-200">
      <h2 className="text-4xl font-semibold mb-6">Top Sellers</h2>
      
      {/* Genre Dropdown */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="relative">
        <button
          ref={prevButtonRef}
          className="absolute left-[-40px] ml-2 top-1/2 w-10 h-10 transform -translate-y-1/2 z-10 bg-blue-500 text-white  rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ❮
        </button>
        <button
          ref={nextButtonRef}
          className="absolute right-[-40px] mr-2 top-1/2 w-10 h-10 transform -translate-y-1/2 z-10 bg-blue-500 text-white  rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ❯
        </button>

        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1080: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellers;
