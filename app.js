require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const wrapAsync = require('./utils/wrapAsync');
const cookieParser = require('cookie-parser');

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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: 'thisistopsecret',
    cookie: {maxAge: 30000},
    resave: false,
    saveUninitialized: false
}))

// =============== Application Routes =============== 
app.use('/user', require('./routes/userRoutes'))
app.use('/tour', require('./routes/bookingRoutes'));

app.get('/', wrapAsync(async (req,res,next)=>{
    res.render('home', {title: 'Foody-Travelers - Home',css:'home.css'});
}));

//  ============== server run =====================
app.listen(process.env.PORT, () => {
    console.log(`Serving on port ${process.env.PORT}`)
});