const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')
const AppError = require('../utils/AppError');
// const {body, validationResult } = require('express-validator');

const app = express();
// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');



router.get('/states', wrapAsync(async (req,res,next)=> {
        const states = await State.find({});
        res.render('tour/allStates', {states, title: 'States',css:'allStates.css'});

}));

router.get('/states/:id/booking', wrapAsync(async(req,res)=>{
        const {id} = req.params;
        const state = await State.findById(id);
        if(!state){
            throw new AppError('State not found!!!', 404);
        }
        res.render('tour/bookingPage', {state, title:`Book-${state.state_name}`, css:'bookingPage.css'});
}));


router.get('/states/:id', wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/showState', {state, title:state.state_name, css:'showState.css'});
}));

router.post('/states/:id/booking', wrapAsync(async(req, res) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.redirect(`/tour/states/${state._id}/booking/ticket`);
}));

router.get('/states/:id/booking/ticket', wrapAsync( async(req,res, next) =>{
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
     res.render('tour/ticketPage',{state, title: 'Confirm-Details', css:'ticketPage.css'});
}));

router.get('/states/:id/booking/ticket/payment',  wrapAsync( async(req,res)=>{
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/paymentPage',{state, title:'Payment', css:'paymentPage.css'});
}));

router.post('/ticket', wrapAsync( async(req, res, next)=>{
    const ticket = new Ticket(req.body);
    // console.log(ticket);
    await ticket.save();
    res.json({
        stats: 'success',
        ticket: ticket.user_Name
    });
}));






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


module.exports = router;