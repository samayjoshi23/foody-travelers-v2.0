const jwt = require('jsonwebtoken');

const User = require('../Models/UserSchema');


const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            req.flash('error', 'You are not logged in, Login or signup first');
            return res.status(401).redirect('/user/login');
        }
        verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: verifyUser._id});
        
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        res.status(401).send(error);
    }
} 

module.exports = auth;