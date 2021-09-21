const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    bankName: {
        type: String
    },
    bankAccountNumber: {
        type: String
    },
    dob: {
        type: String
    },
    education: {
        type: String
    },
    profileUpdated: {
        type: Boolean,
        default: false
    },
    wallet_balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Users', userSchema);