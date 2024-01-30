const { findIndex } = require("lodash");
const Quiz = require("../models/quiz");
const { User } = require("../models/users");
const Result = require("../models/result");
const Attempt = require("../models/attempt");
const auth = require("../middleware/auth");

const route = require("express").Router();

route.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).select(
    "-_id -__v -title -questions.option1.correct -questions.option2.correct -questions.option3.correct -questions.option4.correct -closedDate -openDate"
  );
  res.send(quiz.questions[0]);
});








route.post("/:id",auth, async (req, res) => {
  // Validate Data in the tables
  
  const quiz = await Quiz.findById(req.params.id);
  if(!quiz) return res.status(404).send("Quiz not found")
  
  const user = await User.findById(req.user._id);
  if(!user) return res.status(404).send("User not found")
  
  const question = quiz.questions.find(
    (q) => q._id == req.body.answers.question_id
    );
    if(!question) return res.status(404).send("Question not found")

    const index = quiz.questions.indexOf(question);
    
    // saving the answer in the database
    let attempt = await Attempt.findOne({ user_id: user._id });
    // console.log(attempt)
    if (attempt) {
      attempt.answers.push({
        question_id: question._id,
        option_id: req.body.answers.option_id,
      });
      await attempt.save();
    } else {
      attempt = new Attempt({
        quiz_id: quiz._id,
        user_id: user._id,
        currentIndex: index,
        answers: [
          {
            question_id: question._id,
            option_id: req.body.answers.option_id,
          },
        ],
      });
      
      await attempt.save();
      // console.log(attempt)
  }
  // Checking option and scoring the answer
  let mark = false;
  for (let index = 1; index <= 4; index++) {
    let element = question[`option${index}`];
    if (element._id == req.body.answers.option_id && element.correct == true){
      mark = true
    }      
  }
  let result = await Result.findOne({user_id:user._id, quiz_id:quiz._id})
  if(result){
    if(mark)
      result.obtainedScore+=1
  }else{
    result=new Result({
      user_id:user._id,
      quiz_id : quiz._id,
      obtainedScore:0,
      totalScore:quiz.questions.length
    })
    if(mark)
      result.obtainedScore+=1
  }
  // console.log(result)
  await result.save()
  
  // finding the next question/showing the last question
  
  
  
  if (quiz.questions.length === index +1)
    return res.status(204).send("No More Options Available.");
  else
    res.status(201).send(quiz.questions[index + 1]);
});

module.exports = route;
