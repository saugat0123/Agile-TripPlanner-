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
                password: password,
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

router.post('/login',function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email})
    .then(function(userData){
        if(userData===null){
            //user not found
            return res.status(403).json({message:"invalid details!!"})
        }
        //found user
        bcryptjs.compare(password,userData.password,function(err,result){
            if(result===false){
                return res.status(403).json({message:"invalid details!!"})
            }
            const token=jwt.sign({userId:userData._id},'secretkey')
            res.status(200).json({
                token:token,
                message:"auth sucess!!",
                data:userData
            })
        })
    })
    .catch(function(e){
        res.status(500).json({error:e});
    })
})

router.get("/me/:id", function (req, res) {
    const id = req.params.id;
    User.findById({ _id: id })
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (er) {
            res.status(500).json({ error: e })
        })
})

module.exports=router;  