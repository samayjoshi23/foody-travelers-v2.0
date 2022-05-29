const express = require('express');
const app = express();

// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');
// middleware import
const AppError = require('../utils/AppError');

module.exports.getStates = async (req,res,next)=> {
    let user = req.user;
    const states = await State.find({});
    res.render('tour/allStates', {user, states, title: 'States',css:'allStates.css'});
}


module.exports.bookingPage = async(req,res)=>{
    const user = req.user;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/bookingPage', {user, state, title:`Book-${state.state_name}`, css:'bookingPage.css'});
}


module.exports.showState = async (req, res, next) => {
    let user = req.user;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/showState', {user, state, title:state.state_name, css:'showState.css'});
}


module.exports.detailsPage = async(req, res) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.redirect(`/tour/states/${state._id}/booking/ticket`);
}


module.exports.ticketPage = async(req,res, next) =>{
    let user = req.user;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
     res.render('tour/ticketPage',{user, state, title: 'Confirm-Details', css:'ticketPage.css'});
}


module.exports.paymentPage = async(req,res)=>{
    let user = req.user;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/paymentPage',{user, state, title:'Payment', css:'paymentPage.css'});
}


module.exports.generateTicket = async(req, res, next)=>{
    let user = req.user;
    const ticket = new Ticket(req.body);

    let newTicketObj = {
        tId: ticket._id,
        tName: ticket.state_Name
    }
    user.tickets = user.tickets.concat({newTicketObj});
    console.log(user);

    await user.save();

    res.json({
        stats: 'success',
        ticket: ticket.user_Name
    });
}

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
