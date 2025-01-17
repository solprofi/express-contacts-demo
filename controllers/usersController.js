const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
});

//@desc Delete a user
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid user ID format");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json(user);
});

//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: newUser.id,
            email: newUser.email
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error(error.message);
        }
        throw error;
    }
});

//@desc Login user
//@route POST /api/users/login 
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    } else if (!password) {
        res.status(400);
        throw new Error("Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Invalid password");
    }

    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id
        },
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    );

    console.log('TEST: accessToken', accessToken);

    res.status(200).json({ accessToken });
});

//@desc Get current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser, getUsers, deleteUser };

