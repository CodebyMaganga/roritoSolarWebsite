import { MdOutlineArrowRightAlt } from "react-icons/md";


const Card = ({ title, content, imgSrc }) => {
  return (
    <>
      <div className="card h-[340px] relative ml-1 w-96 shadow-xl">
        <figure>
          <img src={imgSrc} alt="solar lantern" />
        </figure>
        <div className="absolute text-black top-[130px] left-4">
          <h2 className="card-title text-[#FFDD00] text-3xl">
            {title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p className="text-white">{content}</p>
          <div className=" mt-2 text-xl">
            <div className="badge badge-outline p-4 text-[#FF7B00]">
              Shop Now <MdOutlineArrowRightAlt />
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
