// Older Code - Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// middleware import
const AppError = require('../utils/AppError');

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