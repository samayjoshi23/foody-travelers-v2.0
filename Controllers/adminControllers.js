// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// middleware import
const AppError = require('../utils/AppError');

// Defaults
const UserRoles = ['admin', 'user'];


// Get all users and tickets
module.exports.getViews = async(req, res) => {
    let isUser = req.userData;
    const usersData = await User.find({});
    const ticketsData = await Ticket.find({});
    if(!usersData || !ticketsData){
        return res.status(404).send('NO users are found');
    }
    res.render('admin/showData', { isUser, usersData, ticketsData, UserRoles, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
}

// Delete selected tickets
module.exports.deleteTicketAdmin = async(req, res) => {
    const {id} = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted by Admin Successfully');
    res.status(200).redirect('/admin/view');
}


// Delete Selected User from admin panel
module.exports.deleteUserAdmin = async(req, res) => {
    const {id} = req.params;
    let currentUserId = req.user._id
    if(id === `${currentUserId}`){
        req.flash('warning','Admin can not remove himself, ask another admin to remove you')
        return res.status(401).redirect('/admin/view');
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
    res.status(200).redirect('/admin/view');
}

// Update Role of the selected User
module.exports.updateUser = async(req, res) => {
    const {id} = req.params;
    const currentUserId = req.user._id;
    
    if(`${currentUserId}` === id){
        req.flash("warning", "Admin can not change his own role. Contact other admin");
        return res.status(401).redirect('/admin/view');
    }

    const {role} = req.body;
    const user = await User.findByIdAndUpdate({_id: id},{
        role: role
    },
    {
        new: true
    } );

    req.flash("success", `${user.firstName}'s role is changed to ${role}`);
    res.status(200).redirect('/admin/view');
}