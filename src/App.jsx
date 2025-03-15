import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/HomeP/Home";
import Login from "./Pages/Authenticate/Login";
import Register from "./Pages/Authenticate/SignUp";
import CartPage from "./Pages/Books/CartPage";
import Product from "./Pages/product/product";
import ContactUs from "./Pages/contactus/ContactUs";


function App(){
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
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
