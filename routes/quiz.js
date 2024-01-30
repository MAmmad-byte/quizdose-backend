const auth = require('../middleware/auth');
const Attempt = require('../models/attempt');
const Quiz = require('../models/quiz');
const Result = require('../models/result');

const route = require('express').Router()


route.post("/", async(req, res)=>{
    // console.log(req.body)
    const quiz = new Quiz(req.body)
    let response = await quiz.save();
    
    res.send(response)
})
route.get("/",auth, async(req, res)=>{
    // const quiz = await Quiz.find().select("-questions.options.correct")
    const quiz_id = await Result.distinct("quiz_id", {user_id:req.user._id})
    let quiz = await Quiz.find({
        _id:{
            $nin:quiz_id
        }
    }).select("title");
    res.send(quiz)
})


module.exports = route;