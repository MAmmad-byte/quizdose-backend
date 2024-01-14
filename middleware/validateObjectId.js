const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const validate = (id)=>{
    const schema = Joi.object({
        id : Joi.objectId()
    })
    return schema.validate(id);
}

module.exports.validateObjectId = (req,res,next)=>{
    let {error} =validate(req.params);
    console.log(req.params.id)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}
