const  mongoose  = require("mongoose");


module.exports = mongoose.connect("mongodb+srv://masteram070:merapig@cluster0.qk8gi0i.mongodb.net//")
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log("Database Error:", err))