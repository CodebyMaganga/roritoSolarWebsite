
const ProductCasourel = ()=>{

    return(
        <div className="carousel mt-4 w-full h-[35%] ">
  <div id="product1" className="carousel-item relative w-full border  flex-col text-black">
    <img
      src="/Storage-battery.png"
      className="w-full object-cover" />
      <div className="space-y-4 ml-8">
      <p>Solar Batteries</p>
      <p>ksh2500</p>
      </div>
     
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#product4" className="btn btn-circle">❮</a>
      <a href="#product2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="product2" className="carousel-item relative w-full border flex-col text-black">
    <img
      src="/cctv.jpg"
      className="w-full object-cover" />
       <div className="space-y-4 ml-8">
      <p>CCTV Cameras</p>
      <p>ksh1500</p>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#product1" className="btn btn-circle">❮</a>
      <a href="#product3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="product3" className="carousel-item relative w-full border flex-col text-black">
    <img
      src="solar-lamp.jpg"
      className="w-full object-cover" />
      <div className="space-y-4 ml-8">
      <p>Solar Lantern</p>
      <p>ksh1500</p>
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