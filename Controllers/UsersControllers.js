const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Schema
const User = require('../Models/UserSchema');

const ticketSchema = new mongoose.Schema({
    user_Id: String,
    user_Name: String,
    state_Name: {
        type : String,
        required: true
    },
    tour_Source: {
        type: String,
        required: true
    },
    base_Fare: {
        type: Number,
        required: true
    },
    date_of_Booking: {
        type: String,
        required: true
    },
    date_of_Journey:{
        type: String,
        required: true
    },
    no_of_persons: {
        type: Number,
        required: true
    },
    passenger_details: [
        {
            name: {
                type:String,
                required: true
            },
            age: {
                type:Number,
                required: true
            },
            aadharId: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                required: true
            }
        }
    ],
    food_Opted: [
        {
            name: {
                type: String,
                required: true
            },
            Price: {
                type: Number,
                required: true
            },
            Qty: {
                type: Number,
                required: true
            },
            TotalCost: {
                type: Number,
                required: true
            }
        }
    ],
    food_Fare:{
        type: Number,
        required: true
    },
    vehicle_Type: {
        type: String,
        required: true
    },
    vehicle_Fare:{
        type: Number,
        required: true
    },
    pickup_State: {
        type: String,
        required: true
    },
    pickup_City: {
        type: String,
        required: true
    },
    grand_Fare: {
        type: Number,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
// const Ticket = require('../Models/TicketSchema');


// Signup (Post Route) - No Login required
module.exports.signupData = async (req,res)=> {
    
    const {firstName, lastName, email, phone, age, dob, street, ward, city, state, pin, password, cpassword} = req.body;
    
    // If there are errors, returns bad inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array());
        res.redirect('/user/login', 400);
        return;
    }
    
    // Checking wether the user email and phone already exists or not
    let user = await User.findOne({email});
    let mobile = await User.findOne({phone});
    if(user){
        req.flash('error', 'Sorry the user with this email already exists');
        res.status(400).redirect('/user/login');
        return;
    }
    if(mobile){
        req.flash('error', 'Sorry this number is already registered');
        res.status(400).redirect('/user/login');
        return;
    }
    if(password !== cpassword){
        req.flash('error', 'Passwords do not match');
        res.status(400).redirect('/user/login');
        return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    
    user = new User({
        firstName, 
        lastName, 
        email,
        phone,
        age,
        dob,
        street,
        ward,
        city,
        state,
        pin,
        password:secPass
    });
    const token = await user.generateAuthToken();
    
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
        // secure:true
    });

    await user.save();
    req.flash('success', `Hey ${user.firstName}, Welcome to foody travelers`)
    res.status(200).redirect('/');
};


// Login (Get Route) - No Login required
module.exports.loginPage = async (req,res,next)=> {
    let isUser = req.userData;
    let user = req.user;
    res.render('users/login-signup', {isUser, user, title:'Login/Sign Up - Foody Travelers', css:'login-signup.css'});
}

// Login (Post Route) - No Login required
module.exports.loginData = async(req,res,next)=> {
    const {email, password} = req.body;
    const tempUserData = req.body;
    let isUser = req.userData;
    
    let user = await User.findOne({email});
    if(!user){
        req.flash('error', "User doesnot exists");
        res.status(400).redirect('/user/login');
        return;
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err => {
            req.flash('error', err.msg);
        })

        return res.render('users/login-signup', {tempUserData, isUser, user, title:'Login/Sign Up - Foody Travelers', css:'login-signup.css'})
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if(!passwordCompare){
        req.flash('error', "Wrong credentials, Re-enter the correct credentials");
        res.status(400).redirect('/user/login');
        return;
    }
    
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
        // secure: true
    });
    
    req.flash('success', `Hey ${user.firstName}, Welcome back to foody travelers`) 
    res.status(201).redirect('/');
};


// Logout (Get Route) - Login required
module.exports.logout = async(req, res) => {
    // -----To logout from specific device or browser-----
    
    // req.user.tokens = req.user.tokens.filter((currElement) => {
    //     return currElement.token !== req.token;
    // })


    // ---------To logout from all the devices---------
    req.user.tokens = [];
    res.clearCookie('jwt');
    await req.user.save();

    req.flash('success', 'Have a nice day, Logged Out successfully');
    res.status(200).redirect('/user/login');
}


// Account Page (Get Route) - Login required
module.exports.accountPage = async(req,res) => {
    try {
        let user = req.user;
        let isUser = req.userData;

        let tickets = await Ticket.find({user_Id: req.user._id});

        res.render('users/account', {isUser, tickets, user, title:'My Account - Foody Travelers', css:'accounts.css'});

    } catch (error) {
        next();
    }
}


// Update Account details - Login Required
module.exports.updateAccount = async(req,res) => {
    try {
        let isUser = req.userData;
        let tickets = await Ticket.find({user_Id: req.user._id});
        
        let oldUser = req.user;
        console.log(oldUser._id);
        const { firstName, lastName, email, phone, age, dob, street, ward, city, state, pin } = req.body;
        
        let user = await User.findByIdAndUpdate({_id: oldUser._id},{
            firstName, 
            lastName, 
            email,
            phone,
            age,
            dob,
            street,
            ward,
            city,
            state,
            pin
        },
        {
            new: true
        } );

        req.flash('info', 'Account details are updated successfully');
        res.render('users/account', {isUser, tickets, user, title:'My Account - Foody Travelers', css:'accounts.css'})

    } catch (error) {
        console.log(error);
    }
}


// Delete User Account - Login Required 
module.exports.deleteAccount = async(req, res) => {
    try {
        let user = req.user;
        res.clearCookie('jwt');

        const deletedUser = await User.findByIdAndDelete({_id: user._id});

        req.flash('info', `${deletedUser.firstName}, your account is successfully deleted`)
        res.status(200).redirect('/');

    } catch (error) {
        console.log(error);
    }
}


// Update user Password - Login Required
module.exports.updatePassword = async(req, res) => {
    try {
        const {oldPassword, newPassword, cNewPassword} = req.body;
        
        // Printing pre errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array());
            console.log(errors.array());
            res.redirect('/user/login');
            return;
        }
        // Finding user
        let userId = req.user._id;
        let user = await User.findOne({_id: userId});
        if(!user){
            req.flash('error', "User not found, login again");
            res.status(403).redirect('/user/login');
            return;
        }
        
        // Comparing old password of user
        const passwordCompare1 = await bcrypt.compare(oldPassword, user.password);
        if(!passwordCompare1){
            req.flash('error', "Enter correct password");
            res.status(406).redirect('/user/account');
            return;
        }

        // Comparing new 'password' and 'confirm password'
        if(newPassword !== cNewPassword){
            req.flash('error', 'New passwords do not match, enter again');
            res.status(406).redirect('/user/account');
            return;
        }
        
        // generating hashed password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(newPassword,salt);
        
        // Updating into database
        user = await User.findByIdAndUpdate({_id: userId},{
            password: secPass
        },
        {
            new: true
        } );

        req.user.tokens = [];
        res.clearCookie('jwt');
        
        req.flash('info', 'Password Changed, You can login with new password');
        res.status(200).redirect('/user/login');

    } catch (error) {
        console.log(error);
    }
}


// Delete Ticket
module.exports.deleteTicket = async(req, res) => {
    try {
        const { id } = req.params;
        let user = req.user;

        await Ticket.findByIdAndDelete(id);

        let tickets = await Ticket.find({user_Id: user._id});
        user = await User.findByIdAndUpdate({_id: user._id},{
            tickets
        },
        {
            new: true
        } );

        req.flash('info', 'Tour cancelled, you can book another one.');
        res.status(200).redirect('/tour/states');

    } catch (error) {
        console.log(error)
    }
}