const  mongoose  = require("mongoose");


module.exports = mongoose.connect("mongodb://127.0.0.1:27017/jobz")
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log("Database Error:", err))