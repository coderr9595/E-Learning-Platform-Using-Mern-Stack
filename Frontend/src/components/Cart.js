import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); 
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);


  const buyNow = async () => {
    if (!user) {
      console.error("User is not logged in. Please log in to purchase courses.");
      return; 
    }
    
    const courseIds = cart.map(item => item._id);

    const requestBody = {
      userId: user.id, 
      courseIds: courseIds,
    };

    console.log('Request Body:', requestBody); 

    try {
      const response = await axios.post('http://localhost:5000/api/purchased-courses/add', requestBody);
      console.log('Courses purchased:', response.data);
      clearCart(); 
    } catch (error) {
      console.error('Error purchasing courses:', error.response.data);
    }
  };

  return (
    <div
      className="absolute right-0 top-16 w-1/4 h-[calc(100vh-64px)] bg-gray-100 shadow-lg p-4 transition-transform duration-300"
      style={{ zIndex: 1000 }}
    >
      <h3 className="text-lg font-bold mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center mb-2">
                <span>{item.title} - ${item.price}</span>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={buyNow}
          >
            Buy Now
          </button>
        </>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Close Cart
      </button>
    </div>
  );
};

export default Cart;
