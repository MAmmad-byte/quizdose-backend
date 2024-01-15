const express = require("express");
const app = express();
require("./db");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/jobs")
const jobApplication = require("./routes/jobApplication")
const jobApplied = require("./routes/jobsApplied")
const cors = require('cors');
const helmet = require('helmet')
const compression = require('compression')



app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/users/jobs", jobApplication);
app.use("/api/admin/users/appliedjobs", jobApplied);

let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('App is listening. ');
})