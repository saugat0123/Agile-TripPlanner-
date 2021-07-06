const express=require('express');
const { model } = require('mongoose');
const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const router=express.Router();
const{check,validationResult}=require('express-validator');

router.post('/register',[
    check('email','email not inserted!!').not().isEmpty(),
    check('password','password not inserted!!').not().isEmpty()
],function(req,res){
    const validationErr=validationResult(req);
   if(validationErr.isEmpty()) 
   {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const address = req.body.address
    const phone = req.body.phone
    const email = req.body.email
    const userType = req.body.userType
        // bcryptjs.hash(password,10,function(err,hash_password){
            const data=new User({
                firstName: firstName,
                lastName: lastName,
                password: hash_password,
                address: address,
                phone: phone,
                email: email,
                userType: userType
            })
            data.save().then(function(result){
                res.status(201).json({message:"User Registered!!"})
            }).catch(function(err1){
                res.status(500).json({message : err1})
            })

        // })
        
   }
   else{
       res.status(400).json(validationErr.array())
   }
})

module.exports=router;  