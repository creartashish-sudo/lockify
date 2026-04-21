const express = require("express");
const {loginUser, createUser, getAllUsers, changePassword, changeProfilePassword, updateProfile, userLogout,verifyUser,sendEmail } = require('../Controllers/userController');  
const upload = require("../middleware/userUploads.js");

const router = express.Router();

// CREATE user
router.post("/create", upload.single("photo"),createUser);
// LOGIN user
router.post("/login",loginUser);
// GET all users
router.get("/",getAllUsers);
// CHANGE password
router.put("/change-password",changePassword);
// CHANGE profile password
router.put("/change-profile-password",changeProfilePassword);
// UPDATE profile
router.put("/update-profile", upload.single("photo"),updateProfile);
// LOGOUT user
router.post("/logout",userLogout);
// VERIFY user
router.post("/verify",verifyUser);
// SEND email for password reset
router.post("/send-email",sendEmail);

module.exports = router;
