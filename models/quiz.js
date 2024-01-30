const mongoose = require('mongoose')


const optionSchema = new mongoose.Schema({
    label:{
        type:String,
        min:1,
        max:255,
        required:true
    },
    correct:{
        type:Boolean,
        default:false
    }
})


const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        min:5,
        max:1024,
        required:true
    },
    option1:{
        type:optionSchema,
        required:true
    },
    option2:{
        type:optionSchema,
        required:true
    },
    option3:{
        type:optionSchema,
        required:true
    }
,
    option4:{
        type:optionSchema,
        required:true
    }
})


const schema = new mongoose.Schema({
    title:{
        type:String,
        min:5,
        max:1024,
        required:true
    },
    openDate:{
        type:Date,
        default:Date.now
    },
    closedDate:{
        type:Date,
        required:true
    },
    questions:{
        type:[questionSchema]
    }
})



const Quiz = mongoose.model("Quiz", schema)


module.exports = Quiz