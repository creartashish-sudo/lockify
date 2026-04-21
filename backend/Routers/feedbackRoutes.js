const {getAllFeedbacks, createFeedback} = require('../Controllers/feedbackController');


const express = require('express');
const router = express.Router();

// GET all feedbacks
router.get('/', getAllFeedbacks);
router.post('/create', createFeedback);
module.exports = router;