import React, { useState, useEffect,useRef } from "react";
import WebComponent from "./components/webComponent";
import MobileComponent from "./components/mobileComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import BatteryCategory from "./pages/categories/batteries";
import { debounce } from "lodash";
import AllProducts from "./pages/allProducts";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import ShippingDetails from "./pages/shippingDetails";


function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const targetRef = useRef(null)
 
  useEffect(() => {
    // Debounced resize handler for window resize
    const handleResize = debounce(() => {
      setIsLargeScreen(window.innerWidth > 1024);
    }, 200);

    // Observer callback for ResizeObserver
    const observerCallback = (entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        // Call your resize handler or additional logic here
       
      });
    };

    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver(observerCallback);

    // Observe the target element
    if (targetRef.current) {
      resizeObserver.observe(targetRef.current);
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handler once to set the initial state
    handleResize();

    // Cleanup function
    return () => {
      // Remove window resize event listener
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel any pending debounced calls

      // Disconnect ResizeObserver
      if (targetRef.current) {
        resizeObserver.unobserve(targetRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []); 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLargeScreen ? <WebComponent /> : <MobileComponent />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/category/:name" element={<BatteryCategory />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path='/shippingDetails' element={<ShippingDetails />}/>
      </Routes>
        
    </div>
  );
}

export default App;
