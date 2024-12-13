const User= require('../model/user.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const getDataUri = require("../utils/datauri.js");
// const cloudinary = require("../utils/cloudinary.js");

const register = async (req, res) => {
    try {
      if (!req.body) {
        console.log('Request body missing.');
        return res.status(400).json({
          message: "Request body is missing.",
          success: false,
        });
      }
  
      const { fullname, email, phoneNumber, password } = req.body;
  
      if (!fullname || !email || !phoneNumber || !password) {
        console.log('Missing required fields.');
        return res.status(400).json({
          message: "Something is missing.",
          success: false,
        });
      }
  
    
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role: role || 'student', 
       
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({
        message: "Server error.",
        success: false,
      });
    }
  };
  
  

const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }


    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudResponse = null;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Middleware authentication sets req.id
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update user fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
const recuRegister = async (req, res) => {
  try {
    if (!req.body) {
      console.log('Request body missing.');
      return res.status(400).json({
        message: "Request body is missing.",
        success: false,
      });
    }

    const { fullname, email, phoneNumber, password } = req.body;

    if (!fullname || !email || !phoneNumber || !password) {
      console.log('Missing required fields.');
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role:  'recruiter', 
     
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};


module.exports = {
  register,
  login,
  logout,
  updateProfile,
  recuRegister
};
