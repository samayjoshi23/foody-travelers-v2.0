// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// middleware import
const AppError = require('../utils/AppError');


module.exports.getViews = async(req, res) => {
    let isUser = req.userData;
    const usersData = await User.find({});
    const ticketsData = await Ticket.find({});
    if(!usersData || !ticketsData){
        return res.status(404).send('NO users are found');
    }
    res.render('admin/showData', { isUser, usersData, ticketsData, title:'Admin Panel - Foody travelers', css: 'admin/viewData.css'});
}

module.exports.deleteTicketAdmin = async(req, res) => {
    const {id} = req.params;
    await Ticket.findByIdAndDelete(id);
    req.flash('success', 'Ticket deleted by Admin Successfully');
    res.status(200).redirect('/admin/view');
}

module.exports.deleteUserAdmin = async(req, res) => {
    const {id} = req.params;
    if(id === req.user._id){
        req.flash('Admin can not remove himself, ask another admin to remove you')
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