const express = require("express");
const credentialsRouter = express.Router();
const { login, register } = require("../controllers/credentialsContoller");

// Login route
credentialsRouter.post("/login", login);

// Register route
credentialsRouter.post("/register", register);

// Define other user-related routes

module.exports = credentialsRouter;
