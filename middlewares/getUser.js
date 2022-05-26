const jwt = require('jsonwebtoken');
const JWT_SECRET = "Hellobrosamayhere";

const fetchUser = (req, res, next) => {
    // get the user from the JWT Token and add Id to request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}


module.exports = fetchUser;