import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/utils/cards";
import ProductCard from "../components/utils/productCard";
import { IoMdArrowRoundBack } from "react-icons/io";

const AllProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/products/all', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('al prod-->', data);
        setItems(data.allProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-10">
          <div className="flex w-[80%] ml-4 my-4 flex-col gap-4">
            <div className="skeleton bg-slate-500 h-32 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-28"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
          </div>
          <div className="flex w-[80%] ml-4 my-4 flex-col gap-4">
            <div className="skeleton bg-slate-500 h-32 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-28"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
            <div className="skeleton bg-slate-500 h-4 w-full"></div>
          </div>
        </div>
      ) : (
       
        <div className="bg-neutral-200 text-black">
            <div className="mb-6 flex flex-row gap-2 items-center">
            <div className="">
            <IoMdArrowRoundBack onClick={()=> navigate('/homepage')} className="text-black mt-2  text-3xl"/>
            </div>
                <p className="mt-2 text-center">All Categories</p>
            </div>
        {items.map((item, idx) => (
          <div key={idx}>
            <ProductCard
              title={item.title}
              content={item.description}
              imgSrc={item.images}
              price = {item.price}
              tags={item.tags}
            />
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default AllProducts;