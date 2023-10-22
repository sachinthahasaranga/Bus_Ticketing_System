const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { Account } = require('../models/Account')

router.get('/',(req,res)=>{
    Account.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/user_balance/:id',async(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    let DataFound = await Account.findOne({ userId: req.params.id })
    if (DataFound) {
        res.status(200).send(DataFound);
    } else {
        var newRecord= new Account({
            userId: req.params.id,
            balance: 0
        })
    
        newRecord.save((err,docs)=>{
            if(!err){
                res.send(docs)
            }else{
                console.log(err)
                res.status(200).send({"err":"error"})
            }
        })
    }

})

router.get('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    Account.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var newRecord= new Account({
        userId: req.body.userId,
        balance: 0
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    Account.findOne({ userId: req.params.id} ,(err,docs)=>{
        if(!err){
            Account.updateOne({ userId: req.params.id }, { $inc : {balance: req.body.balance} },{new:true}, (err,docs)=>{
                if(!err){
                    res.send({"success":"success"})
                }else{
                    console.log(err)
                    res.status(200).send({"err":"error"})
                }
            })
        }else{
            var newRecord= new Account({
                userId: req.body.userId,
                balance: 0
            })
        
            newRecord.save((err,docs)=>{
                if(!err){
                    res.send(docs)
                }else{
                    console.log(err)
                    res.send({"err":"error"})
                }
            })
        }
    })
    
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    Account.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = router