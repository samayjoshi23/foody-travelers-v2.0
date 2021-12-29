const mongoose = require('mongoose');
const user = require('./user');
const state = require('./StateSchema');

const ticketSchema = new mongoose.Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: user, //userSchema for username
    },
    ticket_details: {
        type: Schema.Types.ObjectId,
        ref: state, //stateSchema for other details
    },
    vehicle:{
        type: Boolean,
        required: true
    },
    passengers: [{
        Passenger_name: {
            type: String,
            required: true
        },
        Age: {
            type: Number,
            required:true,
            min: 1,
            max: 80,
        },
        gender: ['M', 'F', 'T'],
        fitness: {
            type: Boolean,
            required: true
        },
        food_selected:[{
            food_name: String,
            price: Number
        }],
        final_bill: {
            type: Number,
            required: true
        }
    }],
    payment_status: {
        type: Boolean,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;