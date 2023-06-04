console.log('In middleware')
const jwt = require('jsonwebtoken');
console.log('Importing User Schema...')
const User = require('../Models/UserSchema');
console.log('Imported User Schema')

const isLoggedIn = async(req, res, next) => {
    try {
        console.log('In the middleware method')
        let userAdmin = false;
        const token = req.cookies.jwt;
        console.log(token);
        if(!token){
            req.userData = {
                login : false,
                admin : userAdmin
            }
            console.log("No token found");
            next();
            return;
        }
        if(token && (req.url === '/login')){
            console.log("You are already logged in, don't hit manual routes");
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
        console.log("Token found");
        
        next();
    } catch (error) {
        return res.status(401).send(error);
    }
} 

module.exports = isLoggedIn;