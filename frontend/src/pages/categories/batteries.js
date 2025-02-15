import { useEffect,useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { FaShoppingCart } from "react-icons/fa";


const BatteryCategory = () =>{
    const api = process.env.REACT_APP_API_URL

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [allBatteries, setBatteries] = useState()
    const [categ, setCateg] = useState()
    const navigate = useNavigate()
    const {name} = useParams()

    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    useEffect(()=>{

        const fetchCategory = async () => {
            try {
                const resp = await fetch(`${api}/products/all`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                       
                    }
                });
                const data = await resp.json();
                const batteries = data?.allProducts.filter(item => item.category === name);
               
                setBatteries(batteries);
            } catch (error) {
                console.error('Error fetching batteries:', error);
            }
        }

        fetchCategory()
        setCateg(name)


    
        
    },[name])

    return (
        <div className="bg-white h-screen">
            <div className="">
            <IoMdArrowRoundBack onClick={()=> navigate('/homepage')} className="text-black mt-2  text-3xl"/>
            </div>
         
            <div className="absolute top-4 right-8 flex items-center">
                <FaShoppingCart onClick={()=> navigate('/cart')} className="text-black text-3xl relative" />
                {totalCartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalCartQuantity}
                    </span>
                )}
            </div>
        <p className="text-center text-black font-bold text-2xl my-3">{name}</p>
        {
            
            allBatteries?.length ? allBatteries.map((battery,idx)=>(
                <div key={idx} className="border h-[40em]  ">
                    <div className="h-[60%] border">
                        <img src={battery.images[0]} alt="Product" />
                    </div>
                    <div className="mt-4 ml-4"> 
                    <div>
                        {battery && battery.tags.map((task,idx)=>(
                            <div className="bg-slate-500 w-1/2 my-2 px-4 text-white rounded-2xl ">
                            <p   key={idx}>{task}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ml-4 mt-5">
                    <p className="text-black font-bold ">{battery.name}</p>
                    <p>ksh{battery.price}</p>
                    <button onClick={() => dispatch(addItem(battery))} className="bg-[#FFD000] p-4 mt-4 rounded-lg">Add To Cart</button>
                   
                    </div>
                    </div>
                </div>
            ))
            :
            <div className="flex flex-col gap-10">
            <div className="flex w-[80%] ml-4 my-4 flex-col  gap-4">
            <div className="skeleton bg-slate-500 h-32 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-28"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
          </div>
          <div className="flex w-[80%] ml-4 my-4 flex-col  gap-4">
            <div className="skeleton bg-slate-500 h-32 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-28"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
          </div>
          </div>
        }
        </div>
    )
}

export default BatteryCategory