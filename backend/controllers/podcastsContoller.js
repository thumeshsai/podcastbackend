const Podcasts = require("../models/podcasts");
const Category = require("../models/categories")
// Controller function to create a new podcast
const createPodcast = async (req, res) => {
  const { title, description, audio_url, image_url, genres, duration } =
    req.body;

  // Extract user information from JWT (assuming you are using a middleware to set user info in req.user)
  const { id: user_id, username: author } = req.user;
  console.log(genres)
  try {
    // Create a new podcast document
    const newPodcast = new Podcasts({
      title,
      description,
      author,
      audio_url,
      image_url,
      genres,
      duration,
      user_id,
    });

    // Save the new podcast to the database
    await newPodcast.save();

    // Update categories with the new podcastId
    for (const genre of genres) {
      const category = await Category.findOne({ name: genre });
      if (category) {
        category.podcastIds.push(newPodcast._id);
        await category.save();
      }
    }

    // Update the "latest" category
    const latestCategory = await Category.findOne({ name: "Latest" });
    if (latestCategory) {
      // Add the new podcast's ID to the "latest" category
      latestCategory.podcastIds.unshift(newPodcast._id);

      // Limit the "latest" category to 5 podcasts
      const maxPodcastsInLatest = 5;
      if (latestCategory.podcastIds.length > maxPodcastsInLatest) {
        // Remove the exceeding podcasts
        latestCategory.podcastIds = latestCategory.podcastIds.slice(
          0,
          maxPodcastsInLatest
        );
      }
      // Save the changes to the "latest" category
      await latestCategory.save();
    }

    res.status(201).json({ message: "Podcast created successfully" });
  } catch (error) {
    console.error("Error creating podcast:", error);
    res.status(500).json({ message: "Failed to create podcast" });
  }
};


// Controller function to get a list of podcasts by user_id
const getPodcastsByUser = async (req, res) => {
  const { id: user_id } = req.user;
  try {
    // Retrieve a list of podcasts from the database based on user_id
    const podcasts = await Podcasts.find({ user_id });
    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts by user_id:", error);
    res.status(500).json({ message: "Failed to fetch podcasts by user_id" });
  }
};

// Controller function to retrieve podcasts
const getPodcast = async (req, res) => {
    const id= req.query.id;
  try {
    // Retrieve a list of podcasts from the database
    const podcasts = await Podcasts.find({_id :id});
    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    res.status(500).json({ message: "Failed to fetch podcasts" });
  }
};

// Controller function to update an existing podcast
const updatePodcast = async (req, res) => {
  const podcastId = req.params.id;
  const { title, description, author, audio_url, categories, user_id } =
    req.body;

  try {
    // Find the podcast by ID
    const podcast = await Podcasts.findById(podcastId);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Update the podcast properties
    podcast.title = title;
    podcast.description = description;
    podcast.author = author;
    podcast.audio_url = audio_url;
    podcast.categories = categories;
    podcast.user_id = user_id;

    // Save the updated podcast to the database
    await podcast.save();

    res.status(200).json({ message: "Podcast updated successfully" });
  } catch (error) {
    console.error("Error updating podcast:", error);
    res.status(500).json({ message: "Failed to update podcast" });
  }
};

// Controller function to delete an existing podcast
const deletePodcast = async (req, res) => {
  const podcastId = req.params.id;

  try {
    // Find the podcast by ID and remove it
    const deletedPodcast = await Podcasts.findByIdAndRemove(podcastId);

    if (!deletedPodcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Update categories by removing the deleted podcast ID
    for (const genre of deletedPodcast.genres) {
      const category = await Category.findOne({ name: genre });

      if (category) {
        category.podcastIds = category.podcastIds.filter(
          (podcastId) => podcastId.toString() !== deletedPodcast._id.toString()
        );
        await category.save();
      }
    }

    res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    res.status(500).json({ message: "Failed to delete podcast" });
  }
};


module.exports = {
  createPodcast,
  getPodcast,
  updatePodcast,
  deletePodcast,
  getPodcastsByUser,
  // Add other controller functions here
};
