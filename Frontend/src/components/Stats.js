import React from 'react';

const Stats = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto grid grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-3xl font-bold">500+</h2>
          <p className="text-gray-600">Courses Available</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-3xl font-bold">10,000+</h2>
          <p className="text-gray-600">Students Enrolled</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-3xl font-bold">150+</h2>
          <p className="text-gray-600">Certified Instructors</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
