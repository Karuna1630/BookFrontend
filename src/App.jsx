import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/HomeP/Home";
import Register from "./Pages/Authenticate/SignUp";
import CartPage from "./Pages/Books/CartPage";
import Product from "./Pages/product/product";
import ContactUs from "./Pages/contactus/ContactUs";
import CheckOut from "./Pages/Books/CheckOut";
import AddBookForm from "./Components/AddBookForm";
import Login from "./Pages/Authenticate/LogIn";
import BookDetails from "./Pages/Books/BookDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/addbookform" element={<AddBookForm/>}/>
          <Route path="/books/:id" element={<BookDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
