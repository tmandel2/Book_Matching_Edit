const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

router.route('/')
    .get(async (req,res)=>{
        try{
            const allUsers = await User.find();
            res.json({
                status: 200,
                data: allUsers
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .post(async (req,res)=>{
        try{
            const newUser = await User.create(req.body);
            res.json({
                status: 200,
                data: newUser
            });
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id).populate('likedBooks');
            res.json({
                status: 200,
                data: foundUser
            })
            console.log(req.session, '      this is session');
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })
    .delete(async (req,res)=>{
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.json({
                status: 200,
                data: deletedUser
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })


module.exports = router;