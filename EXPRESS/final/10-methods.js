const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api/people', (req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/login', (req,res)=>{
    const { name } = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')
})

app.post('/api/people', (req,res)=>{
    const { name } = req.body
    if(!name){
        return res.status(400).json({success:false,msg:'Please provide name value'})
    }
    res.status(200).json({success:true,person:name})
})

app.listen(5000, ()=> {
    console.log('server listening on port 5000')
})