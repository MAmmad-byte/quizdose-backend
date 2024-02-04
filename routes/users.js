const { User, validateUser } = require("../models/users");
const bcrypt = require('bcrypt');
const route = require("express").Router();
const _ = require("lodash")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const moderator = require("../middleware/moderator");

route.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    res.send(user);
})

route.get('/',[auth, moderator], async(req,res)=>{
    const users = await User.find().select("firstName lastName email ")
    res.send(users)
})


route.post('/',async(req,res)=>{
    let {error} =validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send("Email Already registered!")
    
    user =  new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    });
        
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        let response = await user.save();
        let token = jwt.sign({_id:response._id, firstName:response.firstName, role:response.role}, "MySecureKey" )
        res.send(token); // it must be in header

})


module.exports = route;