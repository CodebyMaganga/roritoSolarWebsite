import React, { useState, useEffect } from "react";
import WebComponent from "./components/webComponent";
import MobileComponent from "./components/mobileComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";


function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

 
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };


    window.addEventListener("resize", handleResize);

 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLargeScreen ? <WebComponent /> : <MobileComponent />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
        
    </div>
  );
}

export default App;
