import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { removeItem } from "../store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  console.log("cartItems", cartItems);

  return (
    <div className="bg-white h-screen">
      <div className="bg-black text-white py-2 flex flex-row items-center gap-4">
        <IoMdArrowRoundBack
          onClick={() => navigate("/homepage")}
          className=" mt-2  text-3xl"
        />
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
        cartItems.map((item) => (
            <div>
          <div
            key={item.id}
            className="flex flex-row gap-8 justify-between items-center p-4 border-b"
          >
            <div className="w-20 border">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Ksh {item.price}</p>
              
            </div>
            <div>
            <p className="text-gray-600">{item.quantity}</p>
            </div>
            <div>
            <MdDelete onClick={() => dispatch(removeItem(item._id))} className="text-2xl mr-2 text-red-500 hover:text-4xl"/>
            </div>
          </div>
          <div className="mt-8 grid place-items-center">
            <button  onClick={() => navigate("/checkout")} className="bg-[#FFD000] text-black px-8 py-2 rounded-lg">Proceed To Checkout</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
