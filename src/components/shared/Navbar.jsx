
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Leaf, Menu, X } from "lucide-react";
import logo from "../../assets/Logo/Rootfarming.png";

export default function Navbar() {
   const [isOpen, setIsOpen] = useState(false);

   const links = (
      <>
         <NavLink
            to="/"
            className={({ isActive }) =>
               `font-medium ${
                  isActive
                     ? "text-green-600"
                     : "text-gray-700 hover:text-green-600"
               }`
            }
         >
            Home
         </NavLink>
         <NavLink
            to="/about"
            className={({ isActive }) =>
               `font-medium ${
                  isActive
                     ? "text-green-600"
                     : "text-gray-700 hover:text-green-600"
               }`
            }
         >
            About
         </NavLink>
         <NavLink
            to="/contact"
            className={({ isActive }) =>
               `font-medium ${
                  isActive
                     ? "text-green-600"
                     : "text-gray-700 hover:text-green-600"
               }`
            }
         >
            Contact
         </NavLink>
      </>
   );

   return (
      <nav className="bg-white shadow-sm px-5 md:px-10 lg:px-16">
         <div className="mx-auto px-4">
            <div className="flex justify-between items-center py-4">
               {/* Logo */}
               <Link to="/" className="flex items-center space-x-2">
                  <img
                     src={logo}
                     alt="Root Farming Logo"
                     className="h-10 w-10"
                  />
                  <span className="text-green-700 font-semibold text-lg">
                     Root Farming
                  </span>
               </Link>

               {/* Desktop Nav links */}
               <div className="hidden md:flex space-x-6">{links}</div>

               {/* Desktop Button */}
               <div className="hidden md:block">
                  <Link
                     to="/auth"
                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Login
                  </Link>
               </div>

               {/* Hamburger for mobile */}
               <div className="md:hidden flex items-center">
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className="text-black focus:outline-none"
                  >
                     {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
               <div className="md:hidden mt-2 space-y-2 pb-3">
                  {/* Mobile NavLinks */}
                  <div
                     className="flex flex-col space-y-2 w-20"
                     onClick={() => setIsOpen(false)}
                  >
                     {links}
                  </div>

                  {/* Mobile Button */}
                  <Link
                     to="/auth"
                     onClick={() => setIsOpen(false)}
                     className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-28"
                  >
                     Login
                  </Link>
               </div>
            )}
         </div>
      </nav>
   );
}
