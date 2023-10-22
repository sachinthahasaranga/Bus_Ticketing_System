const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var md5 = require('md5');

var { User } = require('../models/User')

router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    User.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userFound = await User.findOne({ username: username });
    if (userFound) {
        if(md5(password)==userFound.password){
            res.send(JSON.stringify({"username":"admin",privilege:userFound.privilege,username:userFound.username,id:userFound._id}));
        }else{
            res.status(200).send(JSON.stringify({"err":"Incorrect Password"}));
        }
    } else {
        res.status(200).send(JSON.stringify({"err":"User not found"}));
    }
});

router.post('/',(req,res)=>{
    var newRecord= new User({
        name: req.body.name,
        username: req.body.username,
        nic_or_pass: req.body.nic_or_pass,
        phone: req.body.phone,
        country: req.body.country,
        password: md5(req.body.password),
        privilege: "user"
    })

    newRecord.save((err,docs)=>{
        if(!err){
            console.log(docs)
            res.send(docs)
        }else{
            console.log(err)
            if(err['keyPattern']['username']===1){
                console.log(err['keyPattern']['username'])
                res.send({"err":"username"})
            }else{
                if(err['keyPattern']['nic_or_pass']==1){
                    console.log(err['keyPattern']['nic_or_pass'])
                    res.send({"err":"nic_or_pass"})
                }else{
                    res.send(err)
                }
            }
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords={
        privilege: req.body.privilege
    }

    User.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    User.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = router