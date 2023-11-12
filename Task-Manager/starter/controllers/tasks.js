
const getAllTasks = (req,res)=>{
    res.send('All Items form file')
}

const createTask = (req,res)=>{
    res.send('Created task')
}

const getTask = (req,res)=>{
    res.send('get single task')
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