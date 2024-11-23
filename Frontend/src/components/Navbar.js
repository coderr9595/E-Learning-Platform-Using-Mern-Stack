import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from './Cart'; 
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">E-Learning Platform</div>
        <ul className="flex space-x-4 text-white">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/my-learning">My Learning</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="relative flex items-center">
          {user && (
            <>
              <button
                className="text-white mx-4 relative"
                onClick={() => setShowCart(!showCart)}
              >
                <FaShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">{cart.length}</span>
                )}
              </button>

              <button
                className="text-white font-bold"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name}
              </button>
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                  ref={dropdownRef}
                  style={{ top: 'calc(100% + 10px)' }}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleProfileClick}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleHelpClick}
                  >
                    Help
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="bg-blue-500 px-4 py-2 rounded text-white">Login</Link>
              <Link to="/register" className="ml-2 bg-green-500 px-4 py-2 rounded text-white">Register</Link>
            </>
          )}
        </div>
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </nav>
  );
};

export default Navbar;
