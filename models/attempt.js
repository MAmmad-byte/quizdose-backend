const mongoose = require("mongoose")

const selectedOption = mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    option_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
})

const schema = mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }, 
    quiz_id :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Quiz",
    },
    attemptDate:{
        type:Date,
        default: Date.now
    },
    currentIndex:{
        type:Number,
        min:0,
        max:255,
        default:0
    },
    answers:{
        type:[selectedOption]
    }
})

const Attempt = mongoose.model("AttemptQuiz", schema)


module.exports = Attempt