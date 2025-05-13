// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Crypto Simulator
        </Link>
        <div className="space-x-6">
          <Link to="/dashboard" className="text-white hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/trade" className="text-white hover:text-blue-200">
            Alım/Satım
          </Link>
          <Link to="/login" className="text-white hover:text-blue-200">
            Giriş Yap
          </Link>
          <Link to="/register" className="text-white hover:text-blue-200">
            Kayıt ol
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
