const express = require('express');

const {  getAllPayments, createPayment,createRazorpayOrder  } = require('../Controllers/paymentController');

const router = express.Router();
// GET all payments
router.get('/', getAllPayments);
// CREATE new payment
router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", createPayment);
// router.post('/create', createPayment);
module.exports = router;