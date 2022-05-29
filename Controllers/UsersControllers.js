const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Schema Import
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// Middleware
// const getUser = require('../middlewares/getUser');

module.exports.signupData = ([
    body('username','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
    body('email','Enter a valid Email').isEmail(),
    body('phone','Enter a valid mobile number').isNumeric().isLength({min:10, max:10}),
    body('password','Enter a valid password').isLength({min: 5, max:15}),
    body('cpassword','Enter a valid password').isLength({min: 5, max:15})
], async (req,res)=> {
    const {username, email, phone, password, cpassword} = req.body;
    
    // If there are errors, returns bad inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Checking wether the user email and phone already exists or not
    let user = await User.findOne({email});
    let mobile = await User.findOne({phone});
    if(user){
        return res.status(400).json({error: "Sorry the user with this email already exists"});
    }
    if(mobile){
        return res.status(400).json({error: "Sorry this number is already registered"});
    }
    if(password !== cpassword){
        return res.status(400).json({erros: 'Passwords do not match'})
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    
    
    user = new User({
        username,
        email,
        phone,
        password:secPass
    });
    const token = await user.generateAuthToken();
    
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
        // secure:true
    });
    await user.save();
    // res.status(201).json({success: true, newUser});
    res.redirect('/');
})



module.exports.loginPage = async (req,res,next)=> {
    let user = req.user;
    res.render('users/login-signup', {user, title:'Login/Sign Up - Foody Travelers', css:'login-signup.css'});
}

module.exports.loginData = ([
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password').isLength({min:5, max:15}).exists()
],async(req,res,next)=> {
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Wrong credentials, Re-enter the correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if(!passwordCompare){
        return res.status(400).json({error: "Wrong credentials, Re-enter the correct credentials"});
    }

    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
        // secure: true
    });    
    res.render('home', {title: 'Foody-Travelers - Home',css:'home.css' , user});
});

module.exports.secret = async (req, res)=>{
    const user = req.user
    res.json({status: "Successful", page: "Secret page", cookie: req.cookies.jwt, user});
};


module.exports.logout = async(req, res) => {
    req.user.tokens = req.user.tokens.filter((currElement) => {
        return currElement.token !== req.token;
    })

    // To logout from all the devices
    // req.user.tokens = [];


    res.clearCookie('jwt');
    await req.user.save();
    res.status(200).redirect('/user/login');
}