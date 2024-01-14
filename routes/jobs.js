const { validateObjectId } = require("../middleware/validateObjectId");
const { validateJobs, Job } = require("../models/jobs");

const route = require("express").Router();

route.get("/", async (req, res) => {
  let jobs;
  if (req.query.search) {
    jobs = await Job.distinct("title", {
      title: { $regex: req.query.search, $options: "i" },
    });
  } else {
    jobs = await Job.find();
  }

  res.send(jobs);
});
route.get("/find/:query", async (req, res) => {
  let jobs = await Job.find({
    title: { $regex: req.params.query, $options: "i" },
  }).select("title");

  res.send(jobs);
});

route.get("/:id", validateObjectId, async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.send(job);
});

route.post("/", async (req, res) => {
  let { error } = validateJobs(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let job = new Job({
    title: req.body.title,
    description: req.body.description,
    jobType: req.body.jobType,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    lastDate: req.body.lastDate,
    location: req.body.location,
    noOfPositions: req.body.noOfPositions,
    salary: req.body.salary,
  });
  // job.lastDate = new Date(job.lastDate).toString().split('T')
  console.log(job.lastDate);
  job = await job.save();
  res.send(job);
});

route.put("/:id", (req, res) => {
  res.send("this is put api");
});

route.delete("/:id", async (req, res) => {
  let job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.send("job with the given ID is not found.");
  res.send(job);
});

module.exports = route;
