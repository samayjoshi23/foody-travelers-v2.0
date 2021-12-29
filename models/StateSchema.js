const mongoose = require('mongoose');


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

module.exports = State;