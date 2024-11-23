const express = require('express');
const { addPurchasedCourses, getPurchasedCourses } = require('../controllers/purchasedCourseController');
const router = express.Router();


router.post('/add', addPurchasedCourses);

router.get('/:userId', getPurchasedCourses);

module.exports = router;
