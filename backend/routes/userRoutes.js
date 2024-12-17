
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/isAuthenticator.js')
const { userRegistration, login, viewProfile, updateProfile,Registration,profile} = require('../controller/user.controller.js')
const userModel = require('../model/user.js');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/register', userRegistration);
router.post('/login', login);


// router.get('/logout', logout);



router.get('/profile', authMiddleware(), viewProfile);

router.post('/Compregister', Registration);
router.put('/edit', authMiddleware({ role: 'Admin' }), updateProfile);

router.post('/add', authMiddleware(), profile);

module.exports = router;