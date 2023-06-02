// Older Code - Schema
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');
// const User = require('../Models/UserSchema');

// middleware import
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

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

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name cannot be blank']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name cannot be blank']
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: [true, 'Email cannot be blank']
    },
    phone: {
        type: Number,
        unique:true,
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age cannot be blank']
    },
    dob: {
        type: String,
        trim: true,
        required: [true, 'Birthdate cannot be blank']
    },
    street: {
        type: String,
        trim: true,
        required: [true, 'Street cannot be blank']
    },
    ward: {
        type: String,
        trim: true,
        required: [true, 'Ward cannot be blank']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'City cannot be blank']
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'State cannot be blank']
    },
    pin: {
        type: Number,
        minlength: 6,
        maxlength: 6,
        required: [true, 'PIN cannot be blank']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password cannot be blank']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }],
    tickets: [{
        ticket: String
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        const id = this._id;
        const token = jwt.sign({_id:id.toString()}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        console.log("the error part" + error);
    }
}

const User = mongoose.model('User', userSchema);
const State = mongoose.model('State', stateSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);











// Defaults
const UserRoles = ['admin', 'user'];


// Get all users and tickets
module.exports.dashboard = async(req, res) => {
    let isUser = req.userData;
    const usersData = await User.find({});
    if(!usersData){
        return res.status(404).send('NO users are found');
    }
    res.render('admin/adminDashboard', { isUser, usersData, UserRoles, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
}


// Manage users
module.exports.getUsers = async(req, res) => {
    let isUser = req.userData;
    const usersData = await User.find({});
    const ticketsData = await Ticket.find({});
    if(!usersData || !ticketsData){
        return res.status(404).send('NO users are found');
    }
    let adminCount = await User.countDocuments({role:"admin"});
    let userCount = await User.countDocuments({role:"user"});
    let userStats = {
        admin: adminCount , 
        user: userCount
    };
    res.render('admin/manageUsers', { isUser, usersData, ticketsData, userStats, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
}


// Update Role of the selected User
module.exports.updateUser = async(req, res) => {
    const {id} = req.params;
    const currentUserId = req.user._id;
    
    if(`${currentUserId}` === id){
        req.flash("warning", "Admin can not change his own role. Contact other admin");
        return res.status(401).redirect('/admin/dashboard');
    }

    const {role} = req.body;
    const user = await User.findByIdAndUpdate({_id: id},{
        role: role
    },
    {
        new: true
    } );

    req.flash("success", `${user.firstName}'s role is changed to ${role}`);
    res.status(200).redirect('/admin/dashboard');
}


// Delete Selected User from admin panel
module.exports.deleteUserAdmin = async(req, res) => {
    const {id} = req.params;
    let currentUserId = req.user._id
    if(id === `${currentUserId}`){
        req.flash('warning','Admin can not remove himself, ask another admin to remove you')
        return res.status(401).redirect('/admin/users');
    }
    
    await User.findByIdAndDelete(id);
    console.log("User removed");
    const allTickets = await Ticket.find({});
    
    allTickets.forEach(async (ticket) => {
        if(ticket.user_Id === id){
            await Ticket.findByIdAndDelete({_id: ticket._id});
        } 
    })
    req.flash('success', 'User removed by Admin Successfully');
    res.status(200).redirect('/admin/users');
}


// Manage Tickets
module.exports.getTickets = async(req, res) => {
    let isUser = req.userData;
    const ticketsData = await Ticket.find({});
    const statesData = await State.find({});
    let ticketCount = await Ticket.countDocuments({role:"user"});
    
    if(!ticketsData){
        return res.status(404).send('NO users are found');
    }
    let stateTicketCountArray = [];
    
    statesData.forEach(async (state) => {
        let ticketNumber = await Ticket.countDocuments({"state_name" :`${state.state_name}`});
        let counterObj = {
            stateName: state.state_name,
            ticketCount:  ticketNumber
        }
        stateTicketCountArray.push(counterObj);
    })

    setTimeout(() => {
        res.render('admin/manageTickets', { isUser, ticketsData, stateTicketCountArray, ticketCount, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
    }, 100);
}


// Delete selected tickets
module.exports.deleteTicketAdmin = async(req, res) => {
    const {id} = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted by Admin Successfully');
    res.status(200).redirect('/admin/tickets');
}


// Manage States
module.exports.getStates = async(req, res) => {
    let isUser = req.userData;
    const statesData = await State.find({});
    
    let stateCounter = await State.countDocuments({});

    if(!statesData){
        return res.status(404).send('NO users are found');
    }
    res.status(200).render('admin/manageStates', { isUser, statesData, stateCounter, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
}

module.exports.createState = async(req, res) => {
    let isUser = req.userData;

    res.status(200).render('admin/createState', { isUser, title:'Admin Panel - Foody travelers', css: 'admin/createState.css'});
}