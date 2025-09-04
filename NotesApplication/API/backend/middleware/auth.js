const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkIsAuth(req, res, next) {
  let token;

  // Token header se read karo
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, "hjsgdggsgdg"); // tumhare userController secret key
    req.user = decoded; // decoded me user id, name, email
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = checkIsAuth;
