import { MdOutlineArrowRightAlt } from "react-icons/md";



const ProductCard = ({ title, content, imgSrc, price, tags }) => {
  return (
    <>
      <div className="card h-[26em] my-4 bg-white relative ml-1 w-96 shadow-xl">
        <div className="border h-[70%] mt-2 w-[95%] ml-2 rounded-lg">
          <img src={imgSrc} alt="solar lantern"/>
        </div>
        <div className="absolute text-black top-[100px] left-4">
          <h2 className="card-title text-[#FFDD00] text-3xl">
            {title}

          </h2>
          <p className="text-white">{content}</p>
         
        </div>
      </div>
    </>
  );
};

export default ProductCard;
