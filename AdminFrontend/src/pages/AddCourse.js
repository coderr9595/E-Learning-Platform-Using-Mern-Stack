import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses/add', courseData);
      alert('Course added successfully');
    } catch (err) {
      console.error('Error adding course', err);
    }
  };

  return (
    <div>
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={courseData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={courseData.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={courseData.category} onChange={handleChange} required />
        <input name="instructor" placeholder="Instructor" value={courseData.instructor} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={courseData.price} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" value={courseData.imageUrl} onChange={handleChange} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
