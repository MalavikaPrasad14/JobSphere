
// const express = require('express');
// const userModel = require('../models/userModel'); // Adjust path as needed
// const verifyToken = require('../middleware/verifyToken'); // Path to the verifyToken middleware

// const router = express.Router();

// // Route to get the profile of the logged-in user
// router.get('/profile', verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from token
//         const user = await userModel.findById(userId).select('-password'); // Fetch user data without password

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ user }); // Send user data in the response
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error fetching user profile' });
//     }
// });

// module.exports = router;
