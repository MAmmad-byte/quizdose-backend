const Joi = require('joi');
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const route = require('express').Router()

route.post('/', async(req,res)=>{

    let { error } = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(404).send("Invalid Email or Password")

    let validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword) return  res.status(400).send("Invalid Email or Password")

    let token = jwt.sign({_id:user._id, firstName:user.firstName, role:user.role}, "MySecureKey")
    res.send(token) // it must be in header
})

function validate(user){
     const userValidation = Joi.object({
         email: Joi.string().email().required(),
         password: Joi.string().min(8).max(55).required(),
     })
    return userValidation.validate(user);
}

module.exports = route;