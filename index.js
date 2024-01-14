const express = require("express");
const app = express();
require("./db");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/jobs")
const jobApplication = require("./routes/jobApplication")
const jobApplied = require("./routes/jobsApplied")
var cors = require('cors');

app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/users/jobs", jobApplication);
app.use("/api/admin/users/appliedjobs", jobApplied);


app.listen(5000, ()=>{
    console.log('App is listening. ');
})