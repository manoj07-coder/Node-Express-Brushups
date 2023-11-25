const Job = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const {badRequestError,notFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({Jobs:jobs})
}

const getJob = async (req,res) => {
    const {
        user:{userId},
        params:{id:jobId},
    } = req

    const job = await Job.findOne({
        _id : jobId,
        createdBy : userId
    })


    if(!job){
        throw new notFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId},
    } = req

    if(company ==='' || position === ''){
        throw new badRequestError('Company or postion fields cannot be empty')
    }

    const job = await Job.findOneAndUpdate(
        {_id:jobId,createdBy:userId},
        req.body,
        {new:true, runValidators:true}
    )

    if(!job){
        throw new notFoundError(`NO job with the id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})

}

const deleteJob = async (req,res) => {
    const {
        user:{userId},
        params:{id:jobId}
    } = req
    
    const job = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy:userId
    })

    if(!job){
        throw new notFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}