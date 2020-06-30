import { StringJob } from "./stringjob.model";
import { User } from "../user/user.model";

export const getStringJob = async (req, res) => {
  try {
    let stringJob = await StringJob.findById(req.params.id);
    if (!stringJob) {
      console.log("could not find user");
      return res
        .status(400)
        .send({ error: "could not find user with given id" });
    }
    return res.status(201).send({ data: stringJob });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const getAll = async (req, res) => {
  try {
    let sJobs = await StringJob.find();
    if (!sJobs) {
      console.log("error in retrieving all string jobs");
      return res.status(400).send({ error: "could not GET all string jobs" });
    }
    return res.status(201).send({ data: sJobs });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const getDoneStringJobs = async (req, res) => {
  try {
    let sJobs = await StringJob.find({ status: "DONE" });
    if (!sJobs) {
      console.log("error in retrieving all DONE string jobs");
      return res
        .status(400)
        .send({ error: "could not GET all DONE string jobs" });
    }
    return res.status(201).send({ data: sJobs });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};
export const getNotDoneStringJobs = async (req, res) => {
  try {
    let sJobs = await StringJob.find({ status: "NOT DONE" });
    if (!sJobs) {
      console.log("error in retrieving all NOT DONE string jobs");
      return res
        .status(400)
        .send({ error: "could not GET all DONE string jobs" });
    }
    return res.status(201).send({ data: sJobs });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};

export const createStringJob = async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).send({ error: "could not find user" });
    }
    let sJob = await StringJob.create(req.body);
    if (!sJob) {
      return res.status(400).send({ error: "could not create transaction" });
    }
    user.stringJobs.push(sJob._id);
    user.save();
    return res.status(201).send({ data: sJob });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: e });
  }
};
