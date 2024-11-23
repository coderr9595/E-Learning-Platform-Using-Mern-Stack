import React from 'react';

const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="text-gray-700 mb-4">
          At our e-learning platform, we believe in making quality education accessible to everyone, everywhere. Our mission is to provide learners with the tools and resources they need to achieve their personal and professional goals.
        </p>
        <p className="text-gray-700 mb-4">
          We offer a wide range of courses designed by industry experts that cater to different learning styles. Whether you are looking to enhance your skills or start a new career, we have something for you.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">Expert Instructors: Learn from industry leaders and professionals.</li>
          <li className="mb-2">Flexible Learning: Study at your own pace, anytime and anywhere.</li>
          <li className="mb-2">Comprehensive Curriculum: Courses designed to equip you with practical skills.</li>
          <li className="mb-2">Community Support: Join a community of learners and professionals.</li>
          <li className="mb-2">Affordable Pricing: Quality education at a price that fits your budget.</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Meet Our Team</h3>
        <p className="text-gray-700 mb-4">
          Our team is composed of passionate educators, experienced professionals, and tech enthusiasts dedicated to enhancing the learning experience for everyone. We strive to bring the best educational content and technology together.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Join Us Today!</h3>
        <p className="text-gray-700 mb-4">
          Ready to take the next step in your learning journey? Sign up today and start exploring our vast library of courses!
        </p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
