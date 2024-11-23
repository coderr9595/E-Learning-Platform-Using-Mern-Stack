const PurchasedCourse = require('../models/PurchasedCourse');
const course = require('../models/course');

exports.addPurchasedCourses = async (req, res) => {
    console.log('Received data:', req.body);

    const { userId, courseIds } = req.body;

    if (!userId || !Array.isArray(courseIds) || courseIds.length === 0) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
  
        const validCourseIds = await course.find({ '_id': { $in: courseIds } });
        if (validCourseIds.length !== courseIds.length) {
            return res.status(400).json({ message: 'Some course IDs are invalid' });
        }

        let purchased = await PurchasedCourse.findOne({ userId });

        if (!purchased) {
            purchased = new PurchasedCourse({ userId, courses: [] });
        }

        
        courseIds.forEach((courseId) => {
            if (!purchased.courses.some(course => course.courseId.toString() === courseId)) {
                purchased.courses.push({ courseId });
            }
        });

        await purchased.save();
        res.status(201).json({ message: 'Courses added to My Learning', purchased });
    } catch (err) {
        console.error('Error adding purchased courses:', err);
        res.status(500).json({ message: 'Error adding purchased courses', error: err.message });
    }
};

exports.getPurchasedCourses = async (req, res) => {
    const { userId } = req.params;
  
    console.log('Received userId:', userId); 
    try {
      const purchased = await PurchasedCourse.findOne({ userId }).populate('courses.courseId');
  
      if (!purchased) {
        console.log('No purchased courses found for userId:', userId);
        return res.status(200).json([]); 
      }
  
      console.log('Purchased courses retrieved:', purchased.courses); 
      res.status(200).json(purchased.courses);
    } catch (err) {
      console.error('Error fetching purchased courses:', err.message); 
      console.error('Request parameters:', req.params); 
      res.status(500).json({ message: 'Error fetching purchased courses', error: err.message });
    }
  };
  