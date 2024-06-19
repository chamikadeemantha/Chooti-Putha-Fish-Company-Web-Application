import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.patch("/changepassword", changePassword);

export default router;
