import { HiMenu, HiX } from "react-icons/hi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };
   return (
      <>
         <nav className="bg-[#060b26]">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
               <div className="flex items-center space-x-3 rtl:space-x-reverse whitespace-nowrap">
                  <h1 className="font-roboto text-[22px] sm:text-[28px] font-light leading-[28px] tracking-wider text-center text-white">
                     BITS & ALGORITHM
                  </h1>
               </div>
               <div className="md:hidden">
                  <button
                     id="menu-btn"
                     className="text-white text-2xl"
                     onClick={toggleMenu}
                  >
                     {isOpen ? <HiX /> : <HiMenu />}
                  </button>
               </div>
               <div
                  className="hidden w-full md:flex md:items-center md:justify-end md:space-x-8 rtl:space-x-reverse"
                  id="menu"
               >
                  <ul className="flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
                     <Link to="/contact">
                        <li>
                           <a
                              href="#"
                              className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                           >
                              CONTACT
                           </a>
                        </li>
                     </Link>
                     <li>
                        <a
                           href="#"
                           className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                        >
                           FAQs
                        </a>
                     </li>
                     <Link to="/user-signin">
                        <li>
                           <a
                              href="#"
                              className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                           >
                              SIGN IN
                           </a>
                        </li>
                     </Link>
                  </ul>
                  <Link to="/signup">
                     <button className="bg-[#0075FF] py-2 px-7 flex items-center text-white rounded font-medium text-sm leading-5 tracking-wide text-center">
                        Register
                     </button>
                  </Link>
               </div>
            </div>
            {/* Mobile menu */}
            <div
               className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-800 p-4 transition-transform transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
               } md:hidden`}
            >
               <ul className="flex flex-col space-y-4 mt-4">
                  <li>
                     <a
                        href="#"
                        className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                     >
                        CONTACT
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                     >
                        FAQs
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block py-2 px-3 text-white font-medium font-roboto text-sm leading-6 tracking-wide text-center hover:text-blue-500"
                     >
                        SIGN IN
                     </a>
                  </li>
                  <li>
                     <button className="mx-auto bg-[#0075FF] py-2 px-7 flex items-center text-white rounded font-medium text-sm leading-5 tracking-wide text-center">
                        Register
                     </button>
                  </li>
               </ul>
            </div>
         </nav>
      </>
   );
};
