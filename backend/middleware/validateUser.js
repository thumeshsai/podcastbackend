const { verifyToken } = require("../auth");

const validateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Token verification failed" });
  }
  if (user.role === "user") {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const validateAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Token verification failed" });
  }
  if (user.role === "admin") {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const validateAccount= (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Token verification failed" });
  }
  next();
};
module.exports = { validateUser, validateAdmin ,validateAccount};
