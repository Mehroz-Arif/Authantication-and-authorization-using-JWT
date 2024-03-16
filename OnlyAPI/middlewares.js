const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    return handleInvalidToken(res);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName= decoded.name
    req.user = decoded;
    console.log(userName);
    // console.log(req.user);
    return next(); // Call next to proceed to the next middleware or route handler
  } catch (err) {
  
    return res.send("You are not the author")
  }
};

function handleInvalidToken(res) {
  // If the token is not valid or missing, redirect to the login page
  res.redirect("/login");
}
