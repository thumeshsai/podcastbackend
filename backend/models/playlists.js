const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  podcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcasts",
    },
  ],
  // Other playlist-related fields (e.g., description, date created)
});

playlistSchema.index({ user_id: 1, name: 1 }, { unique: true });

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
