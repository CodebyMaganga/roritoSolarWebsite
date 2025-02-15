import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ShippingDetails = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-white py-4 h-screen">
         <IoMdArrowRoundBack
          onClick={() => navigate("/homepage")}
          className=" mt-2 ml-4 text-black  text-3xl"
        />
      <div className="">
        <p className="text-black  font-bold text-center text-2xl">
          Delivery Details
        </p>
      </div>
      <div className="bg-white">
        <label className="input input-bordered flex bg-white border border-black my-4 items-center gap-2">
          Full Name:
          <input type="text" className="grow bg-white" placeholder="Daisy" />
        </label>
        <label className="input input-bordered bg-white border border-black my-4 flex items-center gap-2">
          Email:
          <input
            type="text"
            className="grow bg-white"
            placeholder="daisy@site.com"
          />
        </label>
        <label className="input input-bordered bg-white border border-black my-4 flex items-center gap-2">
          Phone:
          <input
            type="text"
            className="grow bg-white"
            placeholder="+2547123456789"
          />
        </label>

        <p>Address</p>
        <textarea
          type="text"
          className="grow border mt-4 w-full bg-white"
          placeholder="Add a delivery note"
        />

        <div className="grid place-items-center mt-4">
          <button
           onClick={()=>document.getElementById('my_modal_2').showModal()}
          className="mt-4 bg-[#FFD000] px-4 py-2 rounded-lg text-black  ">
            Confirm Delivery Details
          </button>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn">open modal</button> */}
<dialog id="my_modal_2" className="modal">
  <div className="modal-box bg-white">
    <h3 className="font-bold  text-center text-black text-lg">Confirm order?</h3>
    <div className="flex flex-row justify-around mt-4">
        <button className="btn btn-success">Yes</button>
        <button className="btn btn-error">No</button>
    </div>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
  );
};

export default ShippingDetails;
