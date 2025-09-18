// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { Leaf, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-5 md:px-10 lg:px-16">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="text-green-600" />
            <span className="text-green-700 font-semibold text-lg">
              Root Farming
            </span>
          </Link>

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
      </div>
    </nav>
  );
}
