const jwt = require('jsonwebtoken');

const User = require('../Models/UserSchema');

const auth = async(req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.json({status: "UnSuccessful", message: "Unauthorized - Login Again"})
        }
        verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifyUser);
        const uid = verifyUser._id;
        console.log(uid);
        console.log("before if statement");
        if(!req.cookies.uid){
            console.log("IN if statement");
            res.cookie("uid", uid, {
                expires: new Date(Date.now() + 3000000),
                httpOnly: true,
                // secure: true
            });
        }
        console.log("after if statement");

        // let currentUser = await User.findById(verifyUser._id);
        // console.log(currentUser);
        next();
    } catch (error) {
        res.status(401).send(error);
    }
} 

module.exports = auth;