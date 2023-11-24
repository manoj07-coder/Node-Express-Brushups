const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {badRequestError,authorizationError} = require('../errors')

const register = async (req,res)=>{

    const user = await User.create({...req.body})
    const token =  user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name} ,token})
}

const login = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        throw new badRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new authorizationError('Invalid credentials')
    }

    const isPassword = await user.comparePassword(password)
    if(!isPassword){
        throw new authorizationError('Invaid credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports = {
    register,
    login
}