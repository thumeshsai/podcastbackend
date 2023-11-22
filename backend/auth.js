const jwt = require("jsonwebtoken");

// Define your secret key (replace with your actual secret)
const secretKey = "podcast-secret-key";

// Function to generate a JWT token
const generateToken = (user) => {
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
  return token;
};

// Function to verify a JWT token and extract user data
const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, secretKey);
    return user;
  } catch (error) {
    return null; // Token verification failed
  }
};


module.exports = { generateToken, verifyToken };
