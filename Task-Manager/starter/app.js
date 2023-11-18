const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB =require('./db/connect')
const bodyParser = require('body-parser')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/tasks/',tasks)
app.use(notFound)
app.use(errorHandler)

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