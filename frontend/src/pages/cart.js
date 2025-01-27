import React from "react";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate()
 
    const cartItems = useSelector((state) => state.cart.items);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


    console.log('cartItems',cartItems)

    return (
        <div className="bg-white h-screen">
            <div className="bg-black text-white py-2 flex flex-row items-center gap-4">
            <IoMdArrowRoundBack onClick={()=> navigate('/homepage')} className=" mt-2  text-3xl"/>
                <p className="text-lg text-center mt-2">Cart</p>
            </div>
            <div className="bg-neutral-400  text-white py-4 flex justify-between">
                <div className="ml-2">
                <p>Cart Summary({cartItems.length})</p>
                </div>
                <div className="mr-2">
                    <p>Ksh{totalPrice}</p>
                </div>
                    
            </div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <p>{item.name}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
