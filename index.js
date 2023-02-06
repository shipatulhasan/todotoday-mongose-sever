const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000 
const app = express()
require('dotenv').config()
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Task = require('./schema/Task')


// middleware

 app.use(cors())
 app.use(express.json())

// mongodb

// const client = new MongoClient(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const dbConnection = async()=>{
    try{
       await mongoose.connect(process.env.uri,{
        dbName: 'TodaysTask',
    })
        console.log('Db conncected')
    }
    catch(err){
        console.error(err.message)
    }
}


//  api
app.get('/',(req,res)=>{
    res.send('Bubu form node')
})

const run = async()=>{
    try{
        // get api
        app.get('/task',async(req,res)=>{
            const tasks = await Task.find()
            res.status(200).send(tasks)
        })
        // post api
        app.post('/task',async(req,res)=>{
            const task = req.body
            const newTask = new Task(task)
            const taskData = await newTask.save()
            res.status(200).send(taskData)
        })
        // delete api
        app.delete('/task/:id',async(req,res)=>{
            const id = req.params.id
            const task = await Task.deleteOne({_id:id})
            res.status(200).send(task)
        })
    }
    finally{}
}
run().catch(console.dir)


app.listen(port,async()=>{
    console.log(`Listening form ${port}`)
    await dbConnection()
})
