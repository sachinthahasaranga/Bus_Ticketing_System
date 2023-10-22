const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { Booking } = require('../models/Booking')

router.get('/my/:id',async(req,res)=>{
    await Booking.aggregate([
        { "$addFields": { "routeid": { "$toObjectId": "$routeId" }}},
        { "$lookup": {
            "from": "routes",
            "localField": "routeid",
            "foreignField": "_id",
            "as": "route_details"
        }},
        { $unwind : "$route_details" },
        {$match:{ 'userId' :req.params.id}}
    ]).then((result) => {
        res.send(result)
      })
      .catch((error) => {
        console.log(error);
      });
})

router.get('/',(req,res)=>{
    console.log('get')
    Booking.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',async(req,res)=>{
    await Booking.aggregate([
        { "$addFields": { "routeid": { "$toObjectId": "$routeId" }}},
        { "$lookup": {
            "from": "routes",
            "localField": "routeid",
            "foreignField": "_id",
            "as": "route_details"
        }},
        { $unwind : "$route_details" },
        {$match:{ '_id' : ObjectID(req.params.id) }}
    ]).then((result) => {
        res.send(result)
      })
      .catch((error) => {
        console.log(error);
      });
})

router.post('/',(req,res)=>{
    var newRecord= new Booking({
        userId: req.body.userId,
        routeId: req.body.routeId,
        no_of_tickets: req.body.no_of_tickets
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

    var updateRecords= {
        userId: req.body.userId,
        routeId: req.body.routeId,
        no_of_tickets: req.body.no_of_tickets
    }

    Booking.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(err)
            res.status(200).send({"err":"error"})
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    Booking.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = router