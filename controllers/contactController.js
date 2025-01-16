const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Getting all the contacts"
    });
});

//@desc create a contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);

    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        res.status(400);

        throw new Error("All fields are required");
    }

    res.status(201).json({
        message: "Creating a contact"
    });
});

//@desc Get a contact   
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Getting a contact with id ${req.params.id}`
    });
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Updating a contact with id ${req.params.id}`
    });
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Deleting a contact with id ${req.params.id}`
    });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };