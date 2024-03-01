const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },password: {
        type: String,
        required: true
    },nickname:{
        type:String,
        required:true
    },address: {
        type: {},
        required: true,
    },phone: {
        type: String,
        required: true,
    },role: {
        type: Number,
        default: 0,
    },
    location: String,
    dateOfBirth: String
}, { timestamps: true })
module.exports = mongoose.model('EcommerceUsers', userSchema);