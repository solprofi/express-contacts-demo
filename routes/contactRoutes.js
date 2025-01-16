const express = require("express");
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");

const router = express.Router();

router.route("/")
    .get(getContacts)
    .post(createContact);

router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

router.route("/test").get((req, res) => {
    res.status(200).json({
        message: "this is a test"
    })
});

module.exports = router;