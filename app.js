require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const wrapAsync = require('./utils/wrapAsync');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const createHttpError = require('http-errors');
const connectFlash = require('connect-flash');
const isUser = require('./middlewares/isLoggedIn');

// mongoose connection
mongoose.connect(`mongodb://localhost:${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

// Use files-------
const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));


// Init Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        // secure: true
    },
    resave: false,
    saveUninitialized: false
}));

app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');
    next();
})

// =============== Application Routes =============== 
app.use('/user', require('./routes/userRoutes'))
app.use('/tour', require('./routes/bookingRoutes'));

app.get('/', isUser, wrapAsync(async (req,res,next)=>{
    let user = req.user;
    let isUser = req.isUser;
    res.render('home', {isUser, user, title: 'Foody-Travelers - Home',css:'home.css'});
}));



// ======================= Error- Handlers ===================
// const handleValidationErr = err => {
//     console.dir(err);
//     return new AppError(`Validation Failed...${err.message}`, 400)
// }
// const handleCastErr = err => {
//     console.dir(err);
//     return new AppError(`Cast Error...${err.message}`, 500)
// }
// const handleSyantaxErr = err => {
//     console.dir(err);
//     return new AppError(`Not Valid Syntax...${err.message}`)
// }
// const handleErr = err => {
//     console.dir(err);
//     return new AppError(`There is an Error...${err.message}`)
// }
// const handleReferenceErr = err => {
//     console.dir(err);
//     return new AppError(`There is an Reference Error...${err.message}`)
// }
// const handleTypeErr = err => {
//     console.dir(err);
//     return new AppError(`There is an Reference Error...${err.message}`)
// }

// app.use((err, req, res, next) => {
//     console.log(err.name);
//     //We can single out particular types of Mongoose Errors:
//     if (err.name === 'ValidationError') err = handleValidationErr(err);
//     else if (err.name === 'CastError') err = handleCastErr(err);
//     else if (err.name === 'SyantaxError') err = handleSyantaxErr(err);
//     else if (err.name === 'Error') err = handleErr(err);
//     else if (err.name === 'ReferenceError') err = handleReferenceErr(err);
//     else if (err.name === 'TypeError') err = handleTypeErr(err);
//     next(err);
// });  

// app.use((err, req, res, next) => {
//     const { status = 500, message = 'Something went wrong' } = err;
//     res.status(status).send(message);
// });

app.use((req,res,next) => {
    next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.render('errorPage', {isUser, error, title:'Error - Something went wrong', css:''});
})

//  ============== server run =====================
app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`)
});