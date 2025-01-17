const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
        unique: [true, "Username is already in use"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email is already in use"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);