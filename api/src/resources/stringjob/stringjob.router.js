import { Router } from "express";
import {
  getStringJob,
  createStringJob,
  getNotDoneStringJobs,
  getDoneStringJobs,
  getAll,
} from "./stringjob.controller";
const router = Router();

router.route("/stringjob").post(createStringJob);
router.route("/stringjob").get(getAll);
router.route("/stringjob/done").get(getDoneStringJobs);
router.route("/stringjob/notdone").get(getNotDoneStringJobs);
router.route("/stringjob/:id").get(getStringJob);

export default router;
