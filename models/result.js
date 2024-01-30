const mongoose = require("mongoose")



const schema  = new mongoose.Schema({
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    quiz_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Quiz"
    },
    totalScore:{
        type:Number,
        min:1,
        required:true
    },
    obtainedScore:{
        type:Number,
        min:0,
        required:true
    }
})


const Result = mongoose.model("Result", schema)
module.exports = Result