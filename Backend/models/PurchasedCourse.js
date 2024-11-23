const mongoose = require('mongoose');

const purchasedCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    courses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course', 
        }
    }]
});

module.exports = mongoose.model('PurchasedCourse', purchasedCourseSchema);
