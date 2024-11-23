import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importing AuthContext to get user info

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, cart } = useContext(CartContext);
  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses/all');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses', err);
        setError('Failed to load courses. Please try again later.');
      }
    };
  
    const fetchPurchasedCourses = async () => {
      if (!user) return; // If no user, do not fetch purchased courses
  
      try {
        const res = await axios.get(`http://localhost:5000/api/purchased-courses/${user.id}`);
        setPurchasedCourses(res.data.map(course => course.courseId._id)); // Extract course IDs
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log('No purchased courses for user'); 
          setPurchasedCourses([]); // Set to empty array if no purchased courses
        } else {
          console.error('Error fetching purchased courses', err);
          setError('Failed to load purchased courses.');
        }
      }
    };
  
    // Fetch all courses and purchased courses
    const fetchData = async () => {
      await Promise.all([fetchCourses(), fetchPurchasedCourses()]);
      setLoading(false);
    };
  
    fetchData();
  }, [user]);
  

  const handleEnroll = (course) => {
    const isCourseInCart = cart.some(item => item._id === course._id);
    if (isCourseInCart) {
      alert('This course is already in your cart!');
    } else {
      addToCart(course);
      alert('Course added to cart!');
    }
  };

  // Filter out purchased courses
  const availableCourses = courses.filter(course => !purchasedCourses.includes(course._id));

if (loading) return <div>Loading courses...</div>;
if (error) return <div className="text-red-500">{error}</div>;
  
  // Ensure user is logged in
  if (!user) {
    return <div>Please log in to view available courses.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">All Courses</h2>
      {availableCourses.length === 0 ? (
        <p className="text-gray-500 text-center">All courses have already been purchased.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {availableCourses.map((course) => (
            <div key={course._id} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover mb-4" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <p className="text-gray-600"><strong>Category:</strong> {course.category}</p>
                <p className="text-gray-600"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="text-gray-600 mb-4"><strong>Price:</strong> ${course.price}</p>
                <button 
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => handleEnroll(course)} 
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
