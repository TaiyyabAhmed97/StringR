import { Router } from "express";
import {
    login,
    signUp
} from "./shop.controller";
const router = Router();

router.route("/login").post(login);
router.route("/register").post(signUp)


export default router;
