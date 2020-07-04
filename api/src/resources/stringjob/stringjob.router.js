import { Router } from "express";
import {
  getStringJob,
  createStringJob,
  getNotDoneStringJobs,
  getDoneStringJobs,
  getAll,
  completeStringJob,
  updateStringJob,
} from "./stringjob.controller";
const router = Router();

router.route("/stringjob").post(createStringJob);
router.route("/stringjob").put(updateStringJob);
router.route("/stringjob").get(getAll);
router.route("/stringjob/done").get(getDoneStringJobs);
router.route("/stringjob/done").post(completeStringJob);
router.route("/stringjob/notdone").get(getNotDoneStringJobs);
router.route("/stringjob/:id").get(getStringJob);

export default router;
