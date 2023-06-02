// Middleware and Lib import
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

// ---------------- DefaultCode --------------------
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');


// Added - Schema
const ticketSchema = new mongoose.Schema({
    user_Id: String,
    user_Name: String,
    state_Name: {
        type : String,
        required: true
    },
    tour_Source: {
        type: String,
        required: true
    },
    base_Fare: {
        type: Number,
        required: true
    },
    date_of_Booking: {
        type: String,
        required: true
    },
    date_of_Journey:{
        type: String,
        required: true
    },
    no_of_persons: {
        type: Number,
        required: true
    },
    passenger_details: [
        {
            name: {
                type:String,
                required: true
            },
            age: {
                type:Number,
                required: true
            },
            aadharId: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                required: true
            }
        }
    ],
    food_Opted: [
        {
            name: {
                type: String,
                required: true
            },
            Price: {
                type: Number,
                required: true
            },
            Qty: {
                type: Number,
                required: true
            },
            TotalCost: {
                type: Number,
                required: true
            }
        }
    ],
    food_Fare:{
        type: Number,
        required: true
    },
    vehicle_Type: {
        type: String,
        required: true
    },
    vehicle_Fare:{
        type: Number,
        required: true
    },
    pickup_State: {
        type: String,
        required: true
    },
    pickup_City: {
        type: String,
        required: true
    },
    grand_Fare: {
        type: Number,
        required: true
    }
});

const stateSchema = new mongoose.Schema({
    state_name : {
        type: String,
        required: true
    },
    state_home_cover: {
        type: String,
        required: true
    },
    cities: [{
        city_name: String,
        places: [{
            img_url: String,
            place_name: String,
        }],
        city_hotel: {
            hotel_name: String,
            hotel_img:  String
        },
        city_restaurant: {
            restaurant_name: String,
            restaurant_img: String
        },
    }],
    state_food: {
        type: [{
            f_name: String,
            food_img: String,
            price: Number,
            food_type: String,
            dot_color: String
        }],
        required: true
    },
    base_fare: {
        type: Number,
        required: true
    },
    duration:{ 
        type: String,
        required: true
    },
    tour_source: {
        type: String,
        required: true
    }
});

const State = mongoose.model('State', stateSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);


module.exports.getStates = async (req,res,next)=> {
    let user = req.user;
    let isUser = req.userData;
    const states = await State.find({});
    res.render('tour/allStates', {isUser, user, states, title: 'States',css:'allStates.css'});
}


module.exports.bookingPage = async(req,res, next)=>{
    const user = req.user;
    let isUser = req.userData;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found', 404);
    }
    res.render('tour/bookingPage', {isUser, user, state, title:`Book-${state.state_name}`, css:'bookingPage.css'});
}


module.exports.showState = async (req, res, next) => {
    let user = req.user;
    let isUser = req.userData;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found', 404);
    }
    res.render('tour/showState', {isUser, user, state, title:state.state_name, css:'showState.css'});
}


module.exports.detailsPage = async(req, res) => {
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found', 404);
    }
    res.redirect(`/tour/states/${state._id}/booking/ticket`);
}


module.exports.ticketPage = async(req,res, next) =>{
    let user = req.user;
    let isUser = req.userData;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found', 404);
    }
    res.render('tour/ticketPage',{isUser, user, state, title: 'Confirm-Details', css:'ticketPage.css'});
}


module.exports.paymentPage = async(req,res)=>{
    let user = req.user;
    let isUser = req.userData;
    const {id} = req.params;
    const state = await State.findById(id);
    if(!state){
        throw new AppError('State not found', 404);
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
    req.flash('success', `Ticket Booked Successfully... Happy journey for your tour`)
    res.json({
        status: 'success',
        ticket: ticket.user_Name
    });
}
