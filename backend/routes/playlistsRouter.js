const express = require("express");
const playlistRouter = express.Router();
const {
  createPlaylist,
  getPlaylists,
  getPlaylistByName,
  updatePlaylist,
  deletePlaylist,
  updatePlaylistByName,
  deletePlaylistByName
} = require("../controllers/playlistsController");
const { validateUser } = require("../middleware/validateUser");

// Route to create a new playlist
playlistRouter.post("/", validateUser, createPlaylist);

// Route to get a list of all playlists
playlistRouter.get("/", validateUser, getPlaylists);

playlistRouter
  .route("/:id")
  .put(validateUser, updatePlaylist)
  .delete(validateUser, deletePlaylist);

// Route to get a list of playlists based on the user
playlistRouter
  .route("/name/:name")
  .get(validateUser, getPlaylistByName)
  .put(validateUser , updatePlaylistByName)
  .delete(validateUser,deletePlaylistByName)

module.exports = playlistRouter;
