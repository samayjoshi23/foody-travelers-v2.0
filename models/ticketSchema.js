const mongoose = require('mongoose');

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

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;