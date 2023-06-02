const jwt = require('jsonwebtoken');
// const User = require('../Models/UserSchema');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name cannot be blank']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name cannot be blank']
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: [true, 'Email cannot be blank']
    },
    phone: {
        type: Number,
        unique:true,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age cannot be blank']
    },
    dob: {
        type: String,
        trim: true,
        required: [true, 'Birthdate cannot be blank']
    },
    street: {
        type: String,
        trim: true,
        required: [true, 'Street cannot be blank']
    },
    ward: {
        type: String,
        trim: true,
        required: [true, 'Ward cannot be blank']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'City cannot be blank']
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'State cannot be blank']
    },
    pin: {
        type: Number,
        minlength: 6,
        maxlength: 6,
        required: [true, 'PIN cannot be blank']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password cannot be blank']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }],
    tickets: [{
        ticket: String
    }]
});
userSchema.methods.generateAuthToken = async function() {
    try {
        const id = this._id;
        const token = jwt.sign({_id:id.toString()}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        console.log("the error part" + error);
    }
}
const User = mongoose.model('User', userSchema);


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