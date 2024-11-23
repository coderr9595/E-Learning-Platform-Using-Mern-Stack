const express = require('express');
const { addCourse, getCourses } = require('../controllers/courseController');

const router = express.Router();


router.post('/add', addCourse);


router.get('/all', getCourses);

module.exports = router;
