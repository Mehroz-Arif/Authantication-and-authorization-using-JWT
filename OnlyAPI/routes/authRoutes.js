const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const wrapAsync = require("../utils/wrapAsync.js");


const {verifyToken} = require('../middlewares.js');

router.get("/", verifyToken ,(req,res)=>{
  res.send("Home Route")
})

 
router.route("/register")
  
  .post(authController.register);

router.route("/login")
   
  .post( wrapAsync(authController.login));

  


module.exports = router;