const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true, 
 }
})

module.exports = mongoose.model("Email", emailSchema);