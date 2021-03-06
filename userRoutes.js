const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("./generateToken");
const User = require("./userModel");

const router = express.Router();

//@description     Register new user
//@route           POST /api/users/
//@access          Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404);
      console.log(userExists);
      throw new Error("User Already Exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  })
);

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      const matched = await user.matchPassword(password);

      if (user && matched) {

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
        
      }
    } catch (err) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

module.exports = router;