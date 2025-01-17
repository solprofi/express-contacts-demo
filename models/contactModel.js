const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
      unique: [true, "Email is already in use"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
      unique: [true, "Phone is already in use"],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);