import { useSelector, useDispatch } from 'react-redux';
import { addItem,removeItem } from '../../store/cartSlice';


const ProductCasourel = ()=>{
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

    return(
        <div className="carousel mt-4 w-full h-[35%] ">
  <div id="product1" className="carousel-item relative w-full border  flex-col text-black">
    <img
      src="/Storage-battery.png"
      className="w-full object-cover h-[22em]"
      />
      <div className="space-y-4 py-2 ml-8 text-white  mt-4">
      <p className="text-2xl font-bold">Solar Batteries</p>
      <p className="font-semibold">ksh2499</p>
      <button onClick={() => dispatch(addItem())} className="bg-[#FFD000] p-4 rounded-lg">Add to cart</button>
      </div>
     
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#product4" className="btn btn-circle">❮</a>
      <a href="#product2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="product2" className="carousel-item relative w-full border flex-col text-black">
    <img
      src="/cctv.jpg"
      className="w-full object-cover h-[22em]"
      />
       <div className="space-y-4 ml-8 text-white mt-4 py-2">
      <p className="text-2xl font-bold">CCTV Cameras</p>
      <p className="font-semibold">ksh1500</p>
      <button className="bg-[#FFD000] p-4 rounded-lg">Add to cart</button>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#product1" className="btn btn-circle">❮</a>
      <a href="#product3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="product3" className="carousel-item relative w-full border flex-col text-black">
    <img
      src="solar-lamp.jpg"
      className="w-full object-cover h-[22em]"
      />
      <div className="space-y-4 ml-8 text-white mt-4 py-2">
      <p className="text-2xl font-bold">Solar Lantern</p>
      <p className="font-semibold">ksh1500</p>
      <button className="bg-[#FFD000] p-4 rounded-lg">Add to cart</button>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#product2" className="btn btn-circle">❮</a>
      <a href="#product4" className="btn btn-circle">❯</a>
    </div>
  </div>
  
</div>
    )
}

export default ProductCasourel