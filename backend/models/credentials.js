const mongoose = require("mongoose");

const credentialsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
});

const Credentials = mongoose.model("Credentials", credentialsSchema);

module.exports = Credentials;
