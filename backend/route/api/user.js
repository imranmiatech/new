const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../../../backend/model/User')
const Blog = require('../../../backend/model/Blog')
const authMiddleware = require('../../../backend/middleware/authMiddleware');



router.post('/register', async (req, res) => {
  try {
    const { name, email, age, phone, password } = req.body;

    if (!email) {
      res.status(404).json({ message: "email not found!" })
    };
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const newUser = new User({
      name,
      email,
      age,
      phone,
      password: hash,
    });


    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'সার্ভার সমস্যা', error: error.message });
  }
});
//////login////
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: 'please fill email and password!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'wrong password!' });
    }

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    res.status(200).json({ message: 'login success!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error', error: error.message });
  }
});

/////////get////////
router.get('/total-user', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if (user) {

            res.json(user)
        } else {
            res.status(404).json({ message: "success" })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'top code a somossa' })
    }

})
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // পাসওয়ার্ড বাদ দিয়ে ডাটা পাঠানো
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});
////logout/////
router.post('/logout', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (token) {
    // Add token to blacklist (optional, for immediate invalidation)
    // Example: addToBlacklist(token);
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
});
module.exports = router;