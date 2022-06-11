const jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');

const isLoggedIn = async(req, res, next) => {
    try {
        let userAdmin = false;
        const token = req.cookies.jwt;
        if(!token){
            req.userData = {
                login : false,
                admin : userAdmin
            }
            next();
            return;
        }
        if(token && (req.url === '/login')){
            req.flash('warning', "You are already logged in, don't hit manual routes");
            res.redirect('/user/account');
            next();
            return;
        }
        verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUser = await User.findOne({_id: verifyUser._id});
        

        if(loggedInUser.role === 'admin'){
            userAdmin = true;
        }else{
            userAdmin = false;
        }
        req.userData = {
            login : true,
            admin : userAdmin
        }

        next();
    } catch (error) {
        return res.status(401).send(error);
    }
} 

module.exports = isLoggedIn;