const mongoose = require("mongoose")


const applicationSchema = mongoose.Schema({
    candidateId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    coverLetter:{
        type:String,
        min:5,
        max:500,
        required:true
    },
    appliedDate: {
        type: Date,
        default: Date.now()
    },
    cvPath:{
        type: String,
        required:true,
        max:50
    }
})


const Application = mongoose.model("JobApplication", applicationSchema);

module.exports = Application