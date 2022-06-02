const express = require('express');
const app = express();

// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
// const User = require('../Models/UserSchema');
// middleware import
const AppError = require('../utils/AppError');

module.exports.getStates = async (req,res,next)=> {
    let user = req.user;
    let isUser = req.isUser;
    const states = await State.find({});
    res.render('tour/allStates', {isUser, user, states, title: 'States',css:'allStates.css'});
}


module.exports.bookingPage = async(req,res)=>{
    const user = req.user;
    let isUser = req.isUser;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/bookingPage', {isUser, user, state, title:`Book-${state.state_name}`, css:'bookingPage.css'});
}


module.exports.showState = async (req, res, next) => {
    let user = req.user;
    let isUser = req.isUser;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/showState', {isUser, user, state, title:state.state_name, css:'showState.css'});
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
    let isUser = req.isUser;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/ticketPage',{isUser, user, state, title: 'Confirm-Details', css:'ticketPage.css'});
}


module.exports.paymentPage = async(req,res)=>{
    let user = req.user;
    let isUser = req.isUser;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found!!!', 404);
    }
    res.render('tour/paymentPage',{isUser, user, state, title:'Payment', css:'paymentPage.css'});
}


module.exports.generateTicket = async(req, res, next)=>{
    let user = req.user;

    const bookedTicket = new Ticket(req.body);

    let ticket = bookedTicket._id;
    bookedTicket.user_Id = req.user._id;

    user.tickets = user.tickets.concat({ticket});

    await user.save();
    await bookedTicket.save();

    res.json({
        stats: 'success',
        ticket: ticket.user_Name
    });
}
