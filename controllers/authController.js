const User = require('../models/User');

const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.renderSignup = async (req, res, next) => {

  res.render("users/signup.ejs")


};
exports.register = async (req, res, next) => {
  try {
    if (Object.keys(req.body.name).length && Object.keys(req.body.name).length === 0) {
      throw new Error('Request body is empty');
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) throw new Error('User with this email already exists');

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user);
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.renderlogin = async (req, res, next) => {
  res.render("users/login.ejs")


}
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) throw new Error('User not found');

    const providedPassword = req.body.password;
   
    const isPasswordValid = await bcrypt.compare(providedPassword,user.password);
   
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log(token);
    res.cookie('token', token, { httpOnly: true });
    res.redirect("/")
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; module.exports.protected = async (req, res, next) => {
    res.render('users/home');
  };

