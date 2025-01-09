import { MdOutlineArrowRightAlt } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Card = ({ title, content, imgSrc }) => {
  return (
    <>
      <div className="card h-[340px] relative ml-1 w-96 shadow-xl">
        <figure>
          <LazyLoadImage src={imgSrc} alt="solar lantern" effect="blur"
          wrapperProps={{
            // If you need to, you can tweak the effect transition using the wrapper style.
            style: {transitionDelay: "1s"},
        }}
          />
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
