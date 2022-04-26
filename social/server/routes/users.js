import express from "express";
import { login, singup } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", singup);

export default router;
