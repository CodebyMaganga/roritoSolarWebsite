import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { IoMdArrowRoundBack } from "react-icons/io";



const Checkout = ()=>{
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);

    return(

        <div className="bg-white h-screen text-black">
        <IoMdArrowRoundBack
          onClick={() => navigate("/homepage")}
          className=" mt-2 ml-4  text-3xl"
        />
        <div>
            <p className="text-2xl font-bold my-2 ml-6">Checkout</p>
        </div>
        <div className="mt-4">
            <div>
            {cartItems.map((item) => (
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
           
          </div>
          <div className="mt-8 grid place-items-center space-y-6">
            <button  onClick={() => navigate("/checkout")} className="bg-green-500 text-black px-8 py-2 rounded-lg">Lipa Na Mpesa</button>
            <button  onClick={() => navigate("/shippingDetails")} className="bg-[#FFD000] text-black px-8 py-2 rounded-lg">Pay on delivery</button>
            </div>
          </div>
        ))}
            </div>
        </div>
        </div>
    )
}

export default Checkout