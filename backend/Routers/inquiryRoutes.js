const express = require('express');
const {getAllInquiries, createInquiry} = require('../Controllers/inquiryController');

const router = express.Router();

// GET all inquiries
router.get('/', getAllInquiries);
router.post('/create', createInquiry);
module.exports = router;