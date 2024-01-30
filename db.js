const  mongoose  = require("mongoose");


module.exports = mongoose.connect("mongodb+srv://masteram070:piggi12342623262329663@cluster0.wwzvysv.mongodb.net/quizdose")
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log("Database Error:", err))