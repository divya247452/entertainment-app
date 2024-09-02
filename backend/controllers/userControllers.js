const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({message: error?.message})
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ messsage: "Logged out Successfully" });
  } catch (error) {
    res.status(500).json({message: "Failed to logout"})
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    // Generate token for the newly created user
    generateToken(res, user._id);

    // Send response with the new user details
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // Handle any errors that occur during user registration
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  authUser,
  logoutUser,
  registerUser,
};
