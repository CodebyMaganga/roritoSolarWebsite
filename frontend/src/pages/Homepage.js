import Card from "../components/utils/cards";
import Card2 from "../components/utils/cards2";
import HomeCasourel from "../components/utils/carousel";
import ProductCasourel from "../components/utils/productCarousel";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { GiFamilyTree } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

const Homepage = () => {
  return (
    <>
      <div className="bg-white relative h-[3500px]">
      <FaShoppingCart className="absolute text-black text-2xl top-4 right-8"/>
      <IoMdContact className="absolute text-black text-2xl top-4 right-16" />
      
        <div className="h-[10em] bg-[#FFD000] flex flex-col items-center justify-center">
        
          <div className="">
            <p className="text-black text-center">RoritoSolar Solutions</p>
          </div>

          <div className="mt-4 ">
            <label className="input bg-white input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow "
                placeholder="Search product here..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 "
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
        <HomeCasourel />
        <div className="mt-16 grid place-content-center place-items-center gap-6">
          <Card
            title={"Outdoor Solar Lamps"}
            content={"Buy discounted solar lamps here"}
            imgSrc={"/solar lantern 2.webp"}
          />

          <Card2
            className="h-[200px]"
            title={"Solar Inverters"}
            content={"Best solar brand inverters in the world"}
            imgSrc={"/inverter4.jpg"}
          />
        </div>

        <div className="mt-8">
          <p className="text-black text-xl text-center">Featured Items</p>

          <div>
            <ProductCasourel />
          </div>
        </div>

        <div className="bg-gray-200 h-[24em] mt-6 text-black flex flex-col  items-center">
          <div className="flex flex-col items-center">
            <CiDeliveryTruck className="mt-4 text-6xl" />
            <p>Fast and timely delivery</p>
          </div>
          <div className="flex flex-col items-center mt-3">
            <RiCustomerService2Fill className="mt-4 text-6xl" />
            <p>24/7 Customer Support</p>
          </div>
          <div className="flex flex-col items-center mt-3">
            <FaMoneyBillWave className="mt-4 text-6xl" />
            <p>Easy Online Mobile Payment</p>
          </div>
        </div>

  

        <div className="mt-4 border h-[20em] py-4 text-black">
          <p className="text-center">Shop by Category</p>

          <div className="flex flex-col gap-7">
            <div className="h-[5em] border">
              <img src="/batteryGroup.jpg" alt="battery" />
            </div>

            <div className="h-[5em] border mt-[14em]">
              <img src="/inverterGroup.webp" alt="battery" />
            </div>

            <div className="h-[4em] border-b mt-[5em]">
              <img
                src="/inverter2.png"
                alt="battery"
                className="w-[80%] mt-20 "
              />
            </div>
          </div>
        </div>
        <div className="mt-[38em] h-[27em] bg-base-200">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
             Visit Our Shop
            </div>
            <div className="collapse-content flex flex-row items-center gap-2">
            <CiLocationOn />
              <p>Kitengela,Near Nairobi Womens Hospital</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Contact Us
            </div>
            <div className="collapse-content flex flex-row items-center gap-2">
            <FaPhoneVolume />
              <p>0711106197</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              About
            </div>
            <div className="collapse-content">
              <p>About Us</p>
              <p>Delivery Information</p>
              <p>Privacy Policy</p>
              <p>Terms & Condition</p>
            </div>
          </div>
          <div className="mt-8 flex flex-row items-center justify-center gap-1">
                <p className="text-center">Powered by NiaTech</p>
                <GiFamilyTree />
                
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
