const express = require("express");
const { registerUser, loginUser, currentUser, getUsers, deleteUser } = require("../controllers/usersController");
const validateToken = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); 
router.get("/list", getUsers);
router.delete("/:id", deleteUser);

router.get("/current", validateToken, currentUser);

module.exports = router;     