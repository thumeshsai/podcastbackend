const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique :true,
  },
  podcastIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcasts", // Reference the "Podcasts" model
    },
  ],
  // Other category-related fields (e.g., description)
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
