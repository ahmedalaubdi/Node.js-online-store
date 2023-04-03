const express = require("express");
const route = express.Router();

const User = require("../models/user");

//Get users
route.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(404).json({ success: false, msg: "there is no any user" });
  }

  res.send(userList);
});

//post user
route.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  try {
    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(404).send("There is no user..!");
    }
    res.send(savedUser);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

module.exports = route;
