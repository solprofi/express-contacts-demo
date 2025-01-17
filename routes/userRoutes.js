const express = require("express");
const { registerUser, loginUser, currentUser, getUsers, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); 
router.get("/current", currentUser);
router.get("/list", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;     