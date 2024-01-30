const  mongoose  = require("mongoose");


module.exports = mongoose.connect("mongodb+srv://ammad:123412341234@cluster0.wwzvysv.mongodb.net/test")
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log("Database Error:", err))