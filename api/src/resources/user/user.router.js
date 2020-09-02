import { Router } from "express";
import {
  getUser,
  createUser,
  getUserByPhoneNum,
  getUsers,
} from "./user.controller";
const router = Router();

router.route("/users").post(createUser);
router.route("/users/:id").get(getUser);
router.route("/user/:phoneNumber").get(getUserByPhoneNum);
router.route("/users").get(getUsers);

export default router;
