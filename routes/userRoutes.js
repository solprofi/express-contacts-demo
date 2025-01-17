const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/usersController");

const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({
        message: "this is a test"
    })
});

router.post("/register", registerUser);
router.post("/login", loginUser); 
router.get("/current", currentUser);

module.exports = router;     