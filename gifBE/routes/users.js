const express = require('express');
const router  = new express.Router();
const User = require('../models/User');



//add new admin
router.post('/AddNewUser', async(req,res) => {

    console.log('adding user to the db')
    console.log( req.body );
    try{

        var UserObj =  new User({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email
        })

        var user1 = await UserObj.save()
        res.send({status: 200,results : user1 , message : 'user has signed up'})
    }catch(err){
        res.send('Error ' + err)
    }
})


router.get('/viewAllUsers', async(req,res) => {

    
    try{
        console.log('viewing all users from the data base ')
        console.log( req.body );

        var users = await User.find()
        res.send({status: 200,results : users })
    }catch(err){
        res.send('Error ' + err)
    }
})


router.get('/login', async(req,res) => {

    
    try{
        console.log('logging in  ')
        console.log( req.body );

        email = req.query.email
        password = req.query.password

        const user = await User.findOne({"email": email ,"password" : password })

        if(user){
            res.send({status: 200,result : user })
        }
        
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/AddToFavo', async(req,res) => {

    console.log('adding favourite gif to the db')
    console.log( req.body );
    try{

        
        user = await User.findOneAndUpdate({_id: req.body._id} ,
            { $push: { "favourites": req.body.gifId }})

        res.send({status: 200,message : 'gif has been added to favourites'})
    }catch(err){
        res.send('Error ' + err)
    }
})




router.get('/getFavoIds', async(req,res) => {

    console.log('getting favourites gif from the db')
    console.log( req.body );
    try{

        
        user = await User.findById(req.query.user_id)

        res.send({status: 200,result: user.favourites})
    }catch(err){
        res.send('Error ' + err)
    }
})

router.delete('/removeFavo', async(req,res) => {

    console.log('removing favourite gif from the db')
    console.log( req.body );
    try{

        
        user = await User.findById(req.query.user_id)
        user.favourites = await user.favourites.filter(item => item !== req.query.gifId)
        console.log(user)
        res.send({status: 200,result: user ,message : 'gif has been removed from favourites' })
    }catch(err){
        res.send('Error ' + err)
    }
})

module.exports = router ;