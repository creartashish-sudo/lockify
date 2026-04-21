// const express = require('express');
const User = require('../Models/User');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const { Resend } = require("resend");
const emailjs = require("@emailjs/nodejs");
const { title } = require('process');

// const nodemailer = require("nodemailer");




const createUser = async (req, res) => {
  try {
    const passwordHash = crypto.createHash("md5")
      .update(req.body.password)
      .digest("hex");
    const profilePasswordHash = crypto.createHash("md5")
      .update(req.body.password)
      .digest("hex");
    // console.log(req.body);
    const user = new User({
      ...req.body,
      profile_password: profilePasswordHash,
      password: passwordHash,
      photo: req.file.filename
    });
    await user.save();
    res.status(201).json({
      status: true,
      message: 'User created successfully',
      user_details: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
}

const loginUser = async (req, res) => {
  try {
    //   console.log(req.body);

    const { email, password } = req.body;
    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await User.findOne({ email:email, $or:[{password:hash},{forgot_password:password}] }); // ✅ await + findOne
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      status: true,
      message: "Login successful",
      user_details: user, // ✅ safe to send
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: true,
      user_details: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // console.log(req.body)
    const { userId, currentPassword, newPassword } = req.body;
    const currentPasswordHash = crypto.createHash("md5")
      .update(req.body.currentPassword)
      .digest("hex");
    const newPasswordHash = crypto.createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
    console.log(user.password, currentPasswordHash, user.forgot_password, currentPassword);
    if (user.password !== currentPasswordHash && user.forgot_password !== currentPassword) {
      return res.status(400).json({
        status: false,
        message: 'Old password is incorrect',
      });
    }
    user.password = newPasswordHash;
    user.forgot_password = null;
    await user.save();
    res.status(200).json({
      status: true,
      message: 'Password changed successfully',
      user_details: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const changeProfilePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
    if (user.profile_password !== currentPassword) {
      return res.status(400).json({
        status: false,
        message: 'Old profile password is incorrect',
      });
    }
    user.profile_password = newPassword;
    await user.save();
    res.status(200).json({
      status: true,
      message: 'Profile password changed successfully',
      user_details: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// const updateProfile = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { userId, name, email, contact } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'User not found',
//             });
//         }
//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.contact = contact || user.contact;
//         await user.save();
//         res.status(200).json({
//             status: true,
//             message: 'Profile updated successfully',
//             data: user,
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: error.message,
//         });
//     }
// };

const updateProfile = async (req, res) => {
  try {
    //   console.log("BODY:", req.body); // ✅ text fields
    //   console.log("FILE:", req.file); // ✅ image file

    const { userId, name, email, contact } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.contact = contact || user.contact;

    if (req.file) {
      user.photo = req.file.filename;
    }

    await user.save();

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user_details: user,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const userLogout = async (req, res) => {
  try {
    // Assuming you have some session or token management
    // Here we just send a status response
    res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

const verifyUser = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.find({ profile_password: password });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User verified successfully",
      user_details: user,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "creart.ashish@gmail.com",
    pass: "fjll kzyl ljqh xiog", // App password
  },
});


const generateStrongToken = (length = 12) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "@$!%*?&()#^";

  const allChars = upper + lower + numbers + special;

  // Ensure at least one from each category
  let token =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    special[Math.floor(Math.random() * special.length)];

  // Fill remaining length
  for (let i = token.length; i < length; i++) {
    token += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle token
  return token
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

 const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;


    // 1️⃣ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Generate token
    const resetToken = generateStrongToken(10);

    // 3️⃣ Save token in DB
    user.forgot_password = resetToken;
    await user.save();

    
    // 4️⃣ EmailJS params
    const templateParams = {
      name: user.name,
      email: user.email, 
      title: "Password Reset",
      message: "your password is "+resetToken,
      // reset_token: resetToken,
      // reset_link: `http://localhost:3000/reset-password/${resetToken}`,
    };

    // emailjs.init({
    //   publicKey: "aZKy4vJGYktlHkIc4",
    //   privateKey: "Bl41jl7HdOoZJn5QU5-6n",
    // });
    // console.log(templateParams)
    // await emailjs.send(
    //   "service_m2n9fks",
    //   "template_t3wt9me",
    //   templateParams
    // );
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      text: `Your reset token is: ${resetToken}`,
    });
    

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
};



module.exports = { loginUser, createUser, getAllUsers, changePassword, changeProfilePassword, updateProfile, userLogout, verifyUser,sendEmail };