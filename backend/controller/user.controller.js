const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');


//user registration
const userRegistration = async (req, res) => {
    try {
        const { fullname, email, password, role = "student" } = req.body;

        // Validate required fields
        if (!fullname || !email || !password) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        // Check if the email is already in use
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ success: false, message: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const userData = new userModel({
            fullname,
            email,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        const savedData = await userData.save();

        // Send success response
        res.status(201).send({ success: true, message: "User registered successfully", user: savedData });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};


//login user or admin
const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "User does not exist" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid password" });
      }

      // Generate JWT tokens
      const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);

      // Send response with the tokens
      return res.status(200).json({
          message: "Login successful",
          access_token: accessToken,
          refresh_token: refreshToken
      });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error logging in" });
  }
};
//user details
const viewProfile = async(req, res) => {
  try {
    
    // req.user contains the decoded user data
    const user = req.user;  // The user is added to the request object after token verification
    const data = await userModel.findById(user.id)
    // Return the user profile details
    res.status(200).json({
        fullname: data.fullname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
    });
} catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
}}


//update profile
// Ensure JWT secret and expiration are in your environment variables

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.user.id; // Assuming the decoded token has a user object with an id
        const updatedProfile = req.body;
    
        const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}
  



  

const profile=async(req,res)=>{
  
        try {
            const id=req.body;
            const newProfile=new userModel(id);
            const saved=await newProfile.save();
            res.status(200).send(' added successfully');
        } catch (error) {
             console.error(error); // Log the actual error
            res.status(404).send('Error adding ');
        }
  
}

const Registration = async (req, res) => {
    try {
        const { fullname, email, password, role = "recruiter" } = req.body;

        // Validate required fields
        if (!fullname || !email || !password) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        // Check if the email is already in use
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ success: false, message: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const userData = new userModel({
            fullname,
            email,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        const savedData = await userData.save();

        // Send success response
        res.status(201).send({ success: true, message: "User registered successfully", user: savedData });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send({ success: false, message: "Server error", error: err.message });
    }
};

//logout


module.exports = {userRegistration, login, viewProfile, updateProfile,Registration,profile};