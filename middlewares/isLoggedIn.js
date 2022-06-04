const isLoggedIn = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            req.isUser = false;
            console.log('no user')
            next();
            return;
        }
        if(token && (req.url === '/login')){
            req.isUser = true;
            console.log('user found')
            req.flash('warning', "You are already logged in, don't hit manual routes");
            res.redirect('/user/account');
            // next();
            return;
        }
        req.isUser = true;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
} 

module.exports = isLoggedIn;