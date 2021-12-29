const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    },
    phone: {
        type: number,
        length: 10,
        required: [true, 'Phone cannot be blank']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;