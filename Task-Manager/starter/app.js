const express = require('express')
const app = express()
const tasks = require('./routes/tasks')


app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Task Manager app')
})

app.use('/api/v1/tasks/',tasks)

app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})