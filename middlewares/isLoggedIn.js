const jwt = require('jsonwebtoken');

const isLoggedIn = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            req.isUser = false;
            next();
            return;
        }
        
        req.isUser = true;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
} 

module.exports = isLoggedIn;