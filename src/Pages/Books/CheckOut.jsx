import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/Footer";

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const currentUser = { email: "user@example.com" };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                street: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map((item) => item._id),
            totalPrice: totalPrice,
        };
        console.log(newOrder);
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen">
            <Navbar />
            <div className="container max-w-4xl mx-auto py-10 px-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Checkout</h2>
                    <p className="text-gray-600">Total Price: <span className="font-semibold">${totalPrice}</span></p>
                    <p className="text-gray-600 mb-6">Items: {cartItems.length}</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700">Full Name</label>
                            <input {...register("name", { required: "Full Name is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        
                        <div>
                            <label className="block font-semibold text-gray-700">Email</label>
                            <input type="text" className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100" value={currentUser?.email} disabled />
                        </div>
                        
                        <div>
                            <label className="block font-semibold text-gray-700">Phone</label>
                            <input {...register("phone", { required: "Phone Number is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        
                        <div>
                            <label className="block font-semibold text-gray-700">Address</label>
                            <input {...register("address", { required: "Address is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold text-gray-700">City</label>
                                <input {...register("city", { required: "City is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700">State</label>
                                <input {...register("state", { required: "State is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold text-gray-700">Country</label>
                                <input {...register("country", { required: "Country is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700">Zipcode</label>
                                <input {...register("zipcode", { required: "Zipcode is required" })} type="text" className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <input type="checkbox" className="form-checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
                            <label className="ml-2 text-gray-600">I agree to the <Link className="underline text-blue-600">Terms & Conditions</Link></label>
                        </div>
                        
                        <button disabled={!isChecked} className={`w-full py-3 rounded-lg font-semibold transition-all ${isChecked ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
