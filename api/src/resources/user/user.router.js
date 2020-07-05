import { Router } from "express";
import { getUser, createUser, getUserByPhoneNum } from "./user.controller";
const router = Router();

router.route("/users").post(createUser);
router.route("/users/:id").get(getUser);
router.route("/user").get(getUserByPhoneNum);

export default router;
