const express = require("express");
const Category = require("../models/category");
const route = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");

//get all
route.get("/", async (req, res) => {
  const productList = await Product.find().select("name");
  // const product = await Product.find().select("name -_id"); //to exclode some field we add -name

  if (!productList) {
    return res
      .status(404)
      .json({ msg: "no productLists found", success: "false" });
  }

  res.status(200).send(productList);
});

//get by category
route.get("/byquery", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  // const product = await Product.find().select("name -_id"); //to exclode some field we add -name

  if (!productList) {
    return res
      .status(404)
      .json({ msg: "no productLists found", success: "false" });
  }

  res.status(200).send(productList);
});

//get single product
route.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    return res.status(404).json({ msg: "no products found", success: "false" });
  }

  res.status(200).send(product);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//post
route.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid category");

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  const savedProduct = await product.save();

  if (!savedProduct) {
    res.status(500).json({ success: false, msg: "product can not created..!" });
  }

  res.status(201).send(savedProduct);
});

//update product
route.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(500).send("Invalid product Id");
  }
  const category = await Category.findById(req.body.category);

  if (!category || category === null)
    return res.status(500).send("Invalid category or null");

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!updatedProduct) {
    res
      .status(400)
      .json({ success: false, msg: "product can not be updated..!" });
  }

  res.send(updatedProduct);
});

//delete product

route.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (deletedProduct) {
      res.status(200).json({
        success: true,
        msg: `this product with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this product with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

//get count of products

route.get("/get/count", async (req, res) => {
  const countofProducts = await Product.countDocuments();

  if (!countofProducts) {
    res.status(400).json({ msg: "something went wrong", success: false });
  }

  res.send({ count: countofProducts });
});
//get count of  featured products

route.get("/get/featured/:count", async (req, res) => {
  let count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    +count
  );

  if (!featuredProducts) {
    res.status(400).json({ msg: "something went wrong", success: false });
  }

  res.send(featuredProducts);
});

module.exports = route;
