const mongoose = require("mongoose");

const podcastsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: String,
  audio_url: String,
  image_url: String, // Add image_url field
  genres: {
    type: [String], // Array of genres
    default: [],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  },
  duration: {
    type: Number, // Assuming the duration is in seconds
    default: 0,
  },
  // Other podcast-related fields (e.g., upload date)
});

const Podcasts = mongoose.model("Podcasts", podcastsSchema);

module.exports = Podcasts;
