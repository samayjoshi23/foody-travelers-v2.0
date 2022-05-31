const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name cannot be blank']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name cannot be blank']
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: [true, 'Email cannot be blank']
    },
    phone: {
        type: Number,
        unique:true,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age cannot be blank']
    },
    dob: {
        type: String,
        trim: true,
        required: [true, 'Birthdate cannot be blank']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Address cannot be blank']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password cannot be blank']
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }],
    tickets: [{
        ticket: String
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        const id = this._id;
        const token = jwt.sign({_id:id.toString()}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        console.log("the error part" + error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;