const Task = require('../models/task')

const getAllTasks = (req,res)=>{
    res.send('All Items form file')
}

const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
        
    } catch (error) {
        res.status(500).send({msg:error})
        
    }
}

const getTask = (req,res)=>{
    res.json({id: req.params.id})
}

const updateTask = (req,res)=>{
    res.send('updated task')
}

const deleteTask = (req,res)=>{
    res.send('deleted task')
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}