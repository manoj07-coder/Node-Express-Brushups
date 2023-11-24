const Job = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const {badRequestError,notFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
    res.send('get all jobs')
}

const getJob = async (req,res) => {
    res.send('get job')
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    res.send('update job')
}

const deleteJob = async (req,res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}