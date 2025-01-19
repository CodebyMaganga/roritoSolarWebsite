import { useEffect,useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";



const BatteryCategory = () =>{

    const [allBatteries, setBatteries] = useState()
    const [categ, setCateg] = useState()
    const navigate = useNavigate()
    const {name} = useParams()


    useEffect(()=>{

        const fetchCategory = async () => {
            try {
                const resp = await fetch(`/products/all`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                       
                    }
                });
                const data = await resp.json();
                const batteries = data?.allProducts.filter(item => item.category === name);
                console.log(`all batteries--->`, batteries);
                setBatteries(batteries);
            } catch (error) {
                console.error('Error fetching batteries:', error);
            }
        }

        fetchCategory()
        setCateg(name)


        console.log('name--->',categ)
        
    },[])

    return (
        <div className="bg-white h-screen">
            <IoMdArrowRoundBack onClick={()=> navigate('/homepage')} className="text-black text-3xl"/>
        <p className="text-center text-black font-bold text-2xl my-3">{name}</p>
        {
            
            allBatteries && `${allBatteries.categ}` ? allBatteries.map(battery=>(
                <div className="border h-[34em]  ">
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