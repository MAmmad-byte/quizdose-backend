const route = require("express").Router();
const multer = require("multer");
const Application = require("../models/jobApplicarion");
const auth = require("../middleware/auth");
const { User } = require("../models/users");
const { Job } = require("../models/jobs");

const storage = multer.diskStorage({
  destination: "uploads/cv/",
  filename: function (req, file, cb) {
    fileExtension = file.originalname.split(".")[1];
    cb(null, req.user._id + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

route.post("/", [auth, upload.single("cv")], async (req, res, next) => {
  const job = await Job.findById(req.body.job_id);
  if (!job) return res.status(400).send("Job with the given ID is not found.");
  let user = await User.findById(req.user._id);
  if (!user)
    return res.status(400).send("User with the given ID is not found.");

  let validate = await Application.find({
    jobId: req.body.job_id,
    candidateId: req.user._id,
  });
  if (validate.length > 0) return res.status(400).send("Already Applied.");
  try {
    const application = new Application({
      candidateId: req.user._id,
      jobId: req.body.job_id,
      coverLetter: req.body.coverLetter,
      cvPath: req.file.destination + req.file.filename,
    });
    let response = await application.save();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});


route.get("/admin/:id", [auth], async (req, res) => {
  const applied = await Application.find({ candidateId: req.params.id }).populate("jobId");
  res.send(applied);
});
module.exports = route;
