const express = require("express");
const route = express.Router();

const Category = require("../models/category");

//Get categories
route.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(404).json({ success: false, msg: "there is no any category" });
  }

  res.send(categoryList);
});

//Get category
route.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ success: false, msg: "there is no any category" });
    }

    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update category
route.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
      },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        msg: "there is no any category found to update",
      });
    }

    res.send(updatedCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post category
route.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  try {
    const savedCategory = await category.save();

    if (!savedCategory) {
      return res.status(404).send("There is no category..!");
    }
    res.send(savedCategory);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete category

route.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (deletedCategory) {
      res.status(200).json({
        success: true,
        msg: `this category with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this category with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
