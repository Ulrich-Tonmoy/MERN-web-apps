import { register } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post("/register", register);

export default router;
