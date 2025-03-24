import React, { useState } from "react";

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    price: "",
    exchangeBooks: [],
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExchangeBooks = (e) => {
    const books = e.target.value.split(",");
    setBookData((prev) => ({
      ...prev,
      exchangeBooks: books,
    }));
  };

  const handleImageUpload = (e) => {
    setBookData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data Submitted:", bookData);
    // Here you can send bookData to the backend
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Book Title:</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter book title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter book description"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Exchange Money (Rs):</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter price (if applicable)"
          />
        </div>

        {/* Exchange Books */}
        <div>
          <label className="block font-medium mb-1">Books for Exchange:</label>
          <input
            type="text"
            onChange={handleExchangeBooks}
            className="w-full p-2 border rounded-md"
            placeholder="Enter book titles (comma separated)"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-medium mb-1">Upload Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition"
        >
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
