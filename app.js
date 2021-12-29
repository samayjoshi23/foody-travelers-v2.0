const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
var bodyParser = require('body-parser')
const AppError = require('./AppError');
const State = require('./models/StateSchema');
const session = require('express-session');


mongoose.connect('mongodb://localhost:27017/foody-travelers', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(session({
    secret: 'thisistopsecret',
    cookie: {maxAge: 30000},
    resave: false,
    saveUninitialized: false
}))


function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}




// ------ Tour Routes ---------------
app.get('/', wrapAsync(async (req,res,next)=>{
    res.render('home', {title: 'Foody-Travelers - Home',css:'home.css'});
}));

app.get('/states', wrapAsync(async (req,res,next)=> {
    const states = await State.find({});
    res.render('tour/allStates', {states, title: 'States',css:'allStates.css'});
}));

app.get('/state/:id/booking', wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/bookingPage', {state, title:`Book-${state.state_name}`, css:'bookingPage.css'});
}));


app.get('/states/:id', wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/showState', {state, title:state.state_name, css:'showState.css'});
}));


app.post('/states/:id/booking', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.redirect(`/states/${state._id}/booking/ticket`);
}));

app.get('/states/:id/booking/ticket', wrapAsync( async(req,res, next) =>{
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
     res.render('tour/ticketPage',{state, title: 'Confirm-Details', css:'ticketPage.css'});
}));

app.get('/states/:id/booking/ticket/payment',  wrapAsync( async(req,res)=>{
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/paymentPage',{state, title:'Payment', css:'paymentPage.css'});
}));

app.post('/ticket',(req,res)=>{
    const ticket = req.body;
    console.log(ticket);
    res.json({
        stats: 'success',
        ticket: ticket.user_Name
    });
});







// ======================= Error- Handlers ===================
const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}
const handleCastErr = err => {
    console.dir(err);
    return new AppError(`Cast Error...${err.message}`, 500)
}
const handleSyantaxErr = err => {
    console.dir(err);
    return new AppError(`Not Valid Syntax...${err.message}`)
}
const handleErr = err => {
    console.dir(err);
    return new AppError(`There is an Error...${err.message}`)
}
const handleReferenceErr = err => {
    console.dir(err);
    return new AppError(`There is an Reference Error...${err.message}`)
}
const handleTypeErr = err => {
    console.dir(err);
    return new AppError(`There is an Reference Error...${err.message}`)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    //We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    else if (err.name === 'CastError') err = handleCastErr(err);
    else if (err.name === 'SyantaxError') err = handleSyantaxErr(err);
    else if (err.name === 'Error') err = handleErr(err);
    else if (err.name === 'ReferenceError') err = handleReferenceErr(err);
    else if (err.name === 'TypeError') err = handleTypeErr(err);
    next(err);
});  

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});





//  ============== server run =====================
const port = 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});