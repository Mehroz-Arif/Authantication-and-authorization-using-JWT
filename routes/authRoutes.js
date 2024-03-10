const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const wrapAsync = require("../utils/wrapAsync.js");


const {verifyToken} = require('../middlewares.js');

router.get("/", verifyToken ,(req,res)=>{
  res.send("Home Route")
})

// .get(authController.protected);
router.route("/register")
  .get(authController.renderSignup)
  .post(wrapAsync(authController.register));

router.route("/login")
  .get(authController.renderlogin)
  .post( wrapAsync(authController.login));

  


module.exports = router;