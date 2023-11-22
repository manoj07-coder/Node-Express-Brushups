const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken')
const {badRequestError} = require('../errors')

const login = async (req, res) => {
    const {username,password} = req.body;

    if(!username || !password){
        throw new badRequestError('Please provide login details')
    }

    const id =new Date().getDate();
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res) => {
     
    const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({
            msg:`Hello, ${req.user.username}`,
            secret:`Here is your authorized data and your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}