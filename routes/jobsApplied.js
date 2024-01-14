const auth = require('../middleware/auth');
const Application = require('../models/jobApplicarion');

const route = require('express').Router()



route.get('/', [auth],async(req,res)=>{
    const applied = await Application.find({ candidateId: req.user._id }).populate("jobId");
    res.send(applied);
})
route.get("/:id", [auth], async (req, res) => {
    const applied = await Application.find({ candidateId: req.params.id }).populate("jobId");
    res.send(applied);
  });








module.exports = route;