const Credentials = require("../models/credentials");
const {generateToken} = require("../auth")

// Controller function for handling user registration
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await Credentials.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Create a new user document and save it to the database
    const newUser = new Credentials({
      username: username,
      email : email,
      password : password,
      role : role,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Controller function for handling user login
const login = async (req, res) => {
  const { email, password ,role} = req.body;
  try {
    // Find the user by email in the database
    const user = await Credentials.findOne({ email });
    
    if (!user ) {
      return res.status(401).json({ message: "User Not Found" });
    }
    else if (user.role!==role) {
      return res.status(401).json({ message: "Login as "+user.role });
    }
    else if (user.password !== password){
        return res.status(401).json({ message: "Incorrect Password" });
    }else{
      const token = generateToken({
        id: user.id,
        email,
        username: user.username,
        role,
      });  
      res.cookie("token", token , {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ message: "Login successful"});
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  login,
  register,
};
