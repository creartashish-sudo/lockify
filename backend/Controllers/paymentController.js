const mongoose = require('mongoose');
const Payment = require('../Models/Payment');
const Razorpay =  require("razorpay");
// import razorpay from "../config/razorpay.js";
const crypto = require("crypto") ;

if (!"rzp_test_PvM4GxK9MYlCUc") {
    throw new Error("RAZORPAY_KEY_ID missing in .env");
  }
const razorpay = new Razorpay({
  key_id: "rzp_test_PvM4GxK9MYlCUc",
  key_secret: "WzsOTRAU4l3oAA1CS7jlVS5E",
});


 const createRazorpayOrder = async (req, res) => {
  try {
    console.log("rzp_test_PvM4GxK9MYlCUc");
    const { amount } = req.body; // amount in INR

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      status: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const createPayment = async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        ...paymentData
      } = req.body;
  
      // 🔐 Verify signature
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", "WzsOTRAU4l3oAA1CS7jlVS5E")
        .update(body.toString())
        .digest("hex");
  
      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          status: false,
          message: "Payment verification failed",
        });
      }
  
      // ✅ Save payment
      const obj = {
        ...paymentData,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
        payment_mode: "online",
      };
  
      const payment = new Payment(obj);
      await payment.save();
  
      res.status(201).json({
        status: true,
        message: "Payment successful",
        payment,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };


const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("userId", "name email contact");
        res.status(200).json({
            status: true,
            message: 'Payments retrieved successfully',
            payments: payments,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
// const createPayment = async (req, res) => {
//     try {
//         const obj = {...req.body,status: "paid",payment_mode: "online"};
//         const payment = new Payment(obj);
//         await payment.save();
//         res.status(201).json({
//             status: true,
//             message: 'Payment created successfully',
//             payment: payment,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             message: error.message,
//         });
//     }
// };

module.exports = { createRazorpayOrder, getAllPayments, createPayment };