const mongoose = require("mongoose");
const Joi = require('joi');


const userValidation = Joi.object({
    firstName: Joi.string().min(3).max(55).required(),
    lastName: Joi.string().min(3).max(55).required().default(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(55).required(),
    phone: Joi.string().min(5).max(55).required(),
    address: Joi.string().min(5).max(255).required(),
    dob: Joi.string().isoDate().required()
})

module.exports.validateUser = validateUser = (user)=>{
    return userValidation.validate(user);
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
    max: 55,
    required: true,
  },
  lastName: {
    type: String,
    min: 3,
    max: 55,
    required: true,
    default: "",
  },
  email: {
    type: String,
    min:5,
    max:55,
    required:true,
    unique:true
  },
  password: {
    type: String,
    min: 8,
    max: 255,
    required: true,
  },
  phone: {
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
  dob: {
    type: Date,
    required: true,
  },
  role:{
    isCandidate:{
      type: Boolean,
      default: true
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    isEmployee:{
      type:Boolean,
      default:false
    }
  }
});

const User = mongoose.model("User", userSchema);



module.exports.User = User;