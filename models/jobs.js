const Joi = require("joi");
const { number } = require("joi")
const mongoose = require("mongoose")


module.exports.validateJobs = (jobs)=>{

  
  let schema = Joi.object({
  title: Joi.string().required().min(3).max(55),
  description: Joi.string().required().min(10).max(1024),
  jobType: Joi.string().required().min(5).max(55),
  location: Joi.string().required().min(3).max(55),
  salary: Joi.string().required().min(3).max(55),
  city: Joi.string().required().min(3).max(55),
  country: Joi.string().required().min(3).max(55),
  address: Joi.string().required().min(3).max(255),
  noOfPositions: Joi.number().required().min(1).max(255),
  lastDate: Joi.string().isoDate().required(), 
})
return schema.validate(jobs);
}

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        max: 55,
        required: true,
      },
      description: {
        type: String,
        min: 10,
        max: 1024,
        required: true,
      },
      jobType: {
        type: String,
        min:5,
        max:55,
        required:true,
      },
      location: {
        type: String,
        min: 3,
        max: 20,
        required: true,
      },
      salary: {
        type: String,
        min: 5,
        max: 55,
        required: true,
      },
      city: {
        type: String,
        min: 5,
        max: 55,
        required: true,
      },
      country: {
        type: String,
        min: 5,
        max: 55,
        required: true,
      },
      address: {
        type: String,
        min: 5,
        max: 255,
        required: true,
      },
      noOfPositions: {
        type: Number,
        min: 1,
        max: 255,
        required: true,
      },
      lastDate: {
        type: Date,
        required: true,
      },
      publishDate: {
        type: Date,
        default: Date.now
      },
      featured:{
        type:Boolean,
        default:false
      }

})

module.exports.Job = mongoose.model("Job", jobSchema);



