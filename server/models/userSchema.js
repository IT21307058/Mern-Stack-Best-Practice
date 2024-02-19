const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        // atabase operations to remove leading and trailing whitespace from a string
        trime: true
    },
    lname: {
        type: String,
        required: true,
        // atabase operations to remove leading and trailing whitespace from a string
        trime: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    datecreated: Date,
    dateupdated: Date
});

// model define in mongo db
const users = new mongoose.model("users", userSchema);

// export
module.exports = users;