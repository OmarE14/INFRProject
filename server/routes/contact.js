var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Contact = require('../model/contact');
const contact = require('../model/contact');
let contactController = require('../controllers/book.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const ContactList = await Contact.find();
    res.render('Contact/list',{
        title:'Contacts',
        ContactList:ContactList
    })}
    catch(err){
        console.error(err);
        res.render('Contact/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Contact/add',{
            title: 'Add Contact'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Contact/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newContact = Contact({
            "Name":req.body.Name,
            "PhoneNumber":req.body.PhoneNumber,
            "Notes":req.body.Notes,
            "Email":req.body.Email
        });
        Contact.create(newContact).then(()=>{
            res.redirect('/contactslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Contact/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const contactToEdit= await Contact.findById(id);
        res.render('Contact/edit',
            {
                title:'Edit Contact',
                Contact:contactToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedContact = Contact({
            "_id":id,
            "Name":req.body.Name,
            "PhoneNumber":req.body.PhoneNumber,
            "Notes":req.body.Notes,
            "Email":req.body.Email
        });
        Book.findByIdAndUpdate(id,updatedContact).then(()=>{
            res.redirect('/contactslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Contact/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Contact.deleteOne({_id:id}).then(()=>{
            res.redirect('/contactslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Contact/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;