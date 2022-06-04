const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Schema
const User = require('../Models/UserSchema');
const Ticket = require('../Models/TicketSchema');


// Signup (Post Route) - No Login required
module.exports.signupData = ([
    body('username','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
    body('email','Enter a valid Email').isEmail(),
    body('phone','Enter a valid mobile number').isNumeric().isLength({min:10, max:10}),
    body('password','Enter a valid password').isLength({min: 5, max:15}),
    body('cpassword','Enter a valid password').isLength({min: 5, max:15}),
    body('pin', 'Enter a valid PIN code (6 digits)').isLength({min:6, max:6}),
    body('age', 'Age must be between 16 to 100').isNumeric({min:16, max:100})
], async (req,res)=> {
    
    
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
    
    const address = `${street},${ward},${city},${state},${pin}`;

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
    res.status(201).redirect('/');
})



// Login (Get Route) - No Login required
module.exports.loginPage = async (req,res,next)=> {
    let isUser = req.isUser;
    let user = req.user;
    res.render('users/login-signup', {isUser, user, title:'Login/Sign Up - Foody Travelers', css:'login-signup.css'});
}

// Login (Post Route) - No Login required
module.exports.loginData = ([
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password').isLength({min:5, max:15}).exists()
],async(req,res,next)=> {
    const {email, password} = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array());
        console.log(errors.array());
        res.redirect('/user/login');
        return;
    }
    
    let user = await User.findOne({email});
    if(!user){
        req.flash('error', "Wrong credentials, Re-enter the correct credentials");
        res.status(400).redirect('/user/login');
        return;
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
    res.status(200).redirect('/');
    
});


// Test Page (Authentication and Authorization) (Get Route) - Login required
module.exports.secret = async (req, res)=>{
    const user = req.user
    res.json({status: "Successful", page: "Secret page", cookie: req.cookies.jwt, user});
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

    let isUser = req.isUser;
    console.log(isUser);

    req.flash('success', 'Have a nice day, Logged Out successfully');
    res.status(200).redirect('/user/login');
}


// Account Page (Get Route) - Login required
module.exports.accountPage = async(req,res) => {
    let user = req.user;
    let isUser = req.isUser;

    let tickets = await Ticket.find({user_Id: req.user._id});

    res.render('users/account', {isUser, tickets, user, title:'My Account - Foody Travelers', css:'accounts.css'});
}

// Update Account details - Login Required
module.exports.updateAccount = async(req,res) => {
    
}