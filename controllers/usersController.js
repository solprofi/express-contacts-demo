const asyncHandler = require("express-async-handler");

//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Register user" });
});

//@desc Login user
//@route POST /api/users/login 
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Login user" });
});

//@desc Get current user info
//@route GET /api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };

