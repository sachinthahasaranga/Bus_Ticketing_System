const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
const { Route } = require('../models/Route');
const excel = require('excel4node');

//var { Route } = require('../models/Route')

router.get('/',(req,res)=>{
    Route.find((err,docs)=>{
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

    Route.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var newRecord= new Route({
        name: req.body.name,
        vehicle_num: req.body.vehicle_num,
        driver: req.body.driver,
        time: req.body.time,
        date: req.body.date,
        price: req.body.price,
        descrption: req.body.descrption
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
        name: req.body.name,
        vehicle_num: req.body.vehicle_num,
        driver: req.body.driver,
        time: req.body.time,
        date: req.body.date,
        price: req.body.price,
        descrption: req.body.descrption
    }

    Route.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
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

    Route.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

router.get('/generate-report', async (req, res) => {
    try {
      const routes = await Route.find(); // Fetch all available routes
      const wb = new excel.Workbook(); // Create a new Excel workbook
      const ws = wb.addWorksheet('Routes'); // Add a worksheet to the workbook
  
      // Define the headers
      const headers = ['Name', 'Vehicle Number', 'Driver', 'Time', 'Date', 'Price', 'Description'];
  
      // Create the header row
      const headerRow = ws.addRow(headers);
  
      // Add data rows
      routes.forEach((route) => {
        const { name, vehicle_num, driver, time, date, price, description } = route;
        ws.addRow([name, vehicle_num, driver, time, date, price, description]);
      });
  
      // Set up the response for download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader('Content-Disposition', 'attachment; filename=routes-report.xlsx');
      wb.write(res, 'routes-report.xlsx');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error generating report' });
    }
  });

module.exports = router