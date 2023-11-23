const express = require('express')
const Router = express.Router();

const {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
} = require('../controllers/jobs')

Router.route('/').get(getAllJobs).post(createJob);
Router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = Router