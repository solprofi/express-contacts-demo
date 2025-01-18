const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
});
 
//@desc create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;

    try {
        const newContact = await Contact.create({
            name,
            phone,
            email
        });

        res.status(201).json(newContact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400);
            throw new Error(error.message);
        }
        
        throw error;
    }
});

//@desc Get a contact   
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid contact ID format");
    }
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid contact ID format");
    }

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid contact ID format");
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };