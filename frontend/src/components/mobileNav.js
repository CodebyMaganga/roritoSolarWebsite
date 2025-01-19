import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            navigate('/');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};



  return (
    <div className="relative">
      {/* Burger menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="absolute top-4 left-4 z-50"
      >
        {isOpen ? (
          <IoMdClose className="h-6 w-6 text-black" />
        ) : (
          <CiMenuBurger className="h-6 w-6 text-black" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile menu content */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="pt-16 px-4 relative">
          <nav className="space-y-4">
            <a href="#" className="block py-2 hover:text-yellow-500">Home</a>
            <a href="#" className="block py-2 hover:text-yellow-500">Products</a>
            <a href="#" className="block py-2 hover:text-yellow-500">Categories</a>
            <a href="#" className="block py-2 hover:text-yellow-500">About Us</a>
            <a href="#" className="block py-2 hover:text-yellow-500">Contact</a>
          </nav>
        </div>
        <div 
        onClick={handleLogout}
        className='absolute bottom-1 bg-red-600 text-white h-10 py-2 border w-full '>
        <button className='ml-20'>Log Out</button>
      </div>
      </div>
     
    </div>
  );
};

export default MobileNav;