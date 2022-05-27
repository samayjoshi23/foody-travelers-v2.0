const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    // get the user from the JWT Token and add Id to request object
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        // res.json({Cookie: token});
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}


module.exports = fetchUser;