const auth = require("../middleware/auth");
const Result = require("../models/result")

const route = require("express").Router()



route.get("/",auth ,async (req,res)=>{

    const result = await Result.find({user_id: req.user._id}).populate("quiz_id", "title").sort("-_id")
    let obtain = 0;
    let total = 0;
    result.map((r)=>{
        obtain+=r.obtainedScore
        total += r.totalScore
    })
    const data = {result:[...result], total:total, obtainScore: obtain}
    res.send(data)
})





module.exports = route