const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    fb: Boolean,
    tw: Boolean,
    li: Boolean,
    ig: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    graphs: Array
})

const USER = mongoose.model("user", userSchema);
module.exports = USER;