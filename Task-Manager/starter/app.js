const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB =require('./db/connect')
const bodyParser = require('body-parser')
require('dotenv').config()


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Task Manager app')
})

app.use('/api/v1/tasks/',tasks)

const start = async ()=>{
   try {
       await connectDB(process.env.MONGO_URI)
       app.listen(3000, ()=>{
        console.log("server listening on port 3000") 
    })
   } catch (error) {
    console.log(error)
   }
}

start()