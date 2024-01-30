const  mongoose  = require("mongoose");


module.exports = mongoose.connect(process.env.DBstring)
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log("Database Error:", err))