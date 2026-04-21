const Admin = require('../Models/Admin');

// CREATE new admin
const createAdmin = async (req, res) => {
  try {
    const admin = new Admin({
      ...req.body,
    });
    await admin.save();
    res.status(201).json({
      status: true,
      message: 'Admin created successfully',
      admin_details: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
}
// GET all admins
const loginAdmin = async (req, res) => {
    try{
        const {email,password} = req.body;
        const admin = Admin.findOne({email:email, password:password});

    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}
module.exports = { createAdmin, loginAdmin };