const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken')
const {unAuthenticatedError} = require('../errors')

const authorizationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unAuthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decode;
        req.user = {id,username}
        next()
        
    } catch (error) {
        throw new unAuthenticatedError('Not authorized to access this route')
    }
}

module.exports = authorizationMiddleware