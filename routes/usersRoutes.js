// const express = require("express");
// const route = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const User = require("../models/userModel");

// // const { Products } = require("../model/ProductsModel");

// //post
// route.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please add All Fields");
//     }

//     //check if user already exist
//     const userExist = await User.findOne({ email });

//     if (userExist) {
//       res.status(400);
//       throw new Error("This user Already exist");
//     }

//     //salt
//     const salt = await bcrypt.genSalt(10);

//     //hashedpassword
//     const hashedPassword = await bcrypt.hash(password, salt);

//     //create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("invaled user data");
//     }
//   })
// );
// //login
// route.post(
//   "/login",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("invaled credential");
//     }
//   })
// );
// //post

// //Generatetoken

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "20d",
//   });
// };
// route.get("/me", async (req, res) => {
//   res.status(200).json({ usermsg: "getme" });
// });

// module.exports = route;
