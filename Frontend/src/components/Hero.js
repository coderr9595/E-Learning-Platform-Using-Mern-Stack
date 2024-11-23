import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Hero = () => {
  const navigate = useNavigate(); 

  const handleExploreCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp8149607.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div> 
      <div className="container mx-auto h-full flex flex-col justify-center items-center relative z-10"> 
        <h1 className="text-white text-4xl font-bold">Welcome to Your Learning Journey</h1>
        <p className="text-white text-lg mt-4">Achieve your goals with the best online courses</p>
        <button
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleExploreCourses} 
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default Hero;
