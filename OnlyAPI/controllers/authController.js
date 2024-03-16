const User = require('../models/User');

const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();



exports.register = async (req, res, next) => {
  try {
    if (!req.body.name || Object.keys(req.body.name).length === 0) {
      throw new Error('Name field is required');
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) throw new Error('User with this email already exists');

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user);
   const newUser= await user.save();
console.log(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


