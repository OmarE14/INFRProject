//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let contactModel = mongoose.Schema({
    Name: String,
    PhoneNumber:String,
    Notes: String,
    Email: String
},
{
    collection:"Project_contacts"
});
module.exports =mongoose.model('Contact',contactModel);
