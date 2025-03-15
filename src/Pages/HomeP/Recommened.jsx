import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../Books/BookCard";

const Recommended = () => {
  const [books, setBooks] = useState([]);
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

  return (
    <div className="px-10 py-6 relative bg-gradient-to-r from-blue-50 to-blue-200">
      <h2 className="text-4xl font-semibold mb-6">Recommended For You</h2>

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
          {books.length > 0 &&
            books.slice(8, 16).map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommended;
