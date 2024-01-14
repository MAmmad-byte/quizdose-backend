const { User, validateUser } = require("../models/users");
const bcrypt = require('bcrypt');
const route = require("express").Router();
const _ = require("lodash")
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

route.get('/', async(req,res)=>{
    let users;
    if (req.query.search) {
        users = await User.find({
            $or:
[
            {firstName: { $regex: req.query.search, $options: "i" }},
            {lastName: { $regex: req.query.search, $options: "i" }},
            {phone: { $regex: req.query.search, $options: "i" }},
            {address: { $regex: req.query.search, $options: "i" }},
           { email: { $regex: req.query.search, $options: "i" }}
]
            
            // email: { $regex: req.query.search, $options: "i" },
        
          }).select("-password");
      } else {

          users = await User.find().select("-password");
    }
    res.send(users);
})
route.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    res.send(user);
})


route.post('/',async(req,res)=>{
    let {error} =validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send("Email Already registered!")
    
    user =  new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        address:req.body.address,
        dob:req.body.dob,
        email:req.body.email,
        password:req.body.password
    });
        
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        let response = await user.save();
        let token = jwt.sign({_id:response._id, firstName:response.firstName, role:response.role}, "MySecureKey" )
        res.send(token);

})


module.exports = route;