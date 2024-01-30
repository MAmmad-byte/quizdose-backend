const express = require("express");
const app = express();
require("./db");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const quizRoute = require("./routes/quiz")
const quizAttemptRoute = require("./routes/attempt")
const quizResult = require("./routes/result")
const cors = require('cors');
const helmet = require('helmet')
const compression = require('compression')



app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/user/quiz", quizAttemptRoute);
app.use("/api/user/result", quizResult);

let port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('App is listening on PORT: '+port);
})