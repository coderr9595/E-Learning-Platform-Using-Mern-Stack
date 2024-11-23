const Course = require('../models/course');

exports.addCourse = async (req, res) => {
  const { title, description, category, instructor, price, imageUrl } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      instructor,
      price,
      imageUrl,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course', error: err.message });
  }
};


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};
