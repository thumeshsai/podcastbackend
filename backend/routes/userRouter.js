const express = require("express");
const userRouter = express.Router();
const {validateAdmin ,validateUser}= require("../middleware/validateUser");

userRouter.get("/user",validateUser, (req, res) => {
  const user = req.user;
  res.json({ user });
});
userRouter.get("/admin",validateAdmin, (req, res) => {
  const user = req.user;
  res.json({ user });
});
userRouter.get("/logout",(req,res)=>{
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "User successfully logged out" });
});

module.exports = userRouter;