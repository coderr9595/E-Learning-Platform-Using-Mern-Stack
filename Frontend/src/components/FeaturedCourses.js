import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses/all');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  const handleViewMore = () => {
    navigate('/courses'); 
  };

  return (
    <div className="container mx-auto my-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Featured Courses</h2>
        <button 
          onClick={handleViewMore} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          View More
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {courses.length > 0 ? (
          courses.map(course => ( 
            <div key={course._id} className="bg-white shadow-lg p-6 rounded-lg flex-shrink-0 w-64">
              <img src={course.imageUrl} alt={course.title} className="mb-4 rounded-lg" />
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Enroll Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No featured courses available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCourses;
