import { getAllUsers, getUserById, updateUser } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
