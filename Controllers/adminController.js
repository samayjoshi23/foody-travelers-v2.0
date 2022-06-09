// Schema
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// middleware import
const AppError = require('../utils/AppError');


module.exports.getViews = async(req, res) => {
    let isUser = req.userData;
    const users = await User.find({});
    const tickets = await Ticket.find({});
    if(!users || !tickets){
        return res.status(404).send('NO users are found');
    }
    res.set("Content-Type", "text/html");
    res.render('admin/showData', { isUser, users, tickets, title:'Admin Panel - Foody travelers', css: ''});
}
