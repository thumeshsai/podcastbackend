const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesContoller");
const {validateAccount ,validateAdmin} = require("../middleware/validateUser")

// Route to get a list of categories
categoryRouter.get("/",validateAccount, getCategories);

// Route to create a new category
categoryRouter.post("/" , createCategory);

categoryRouter
  .route("/id/:id")
  .delete(deleteCategory)
  
categoryRouter
  .route("/:name")
  .put(validateAdmin ,updateCategory)
  .delete(validateAdmin,deleteCategory)
  .get(validateAccount, getCategory);
module.exports = categoryRouter;
