import { authHandler } from "../middleware/auth-handler";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unFollowUser,
  updateUser,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", authHandler, updateUser);
router.delete("/:id", authHandler, deleteUser);
router.put("/follow/:id", authHandler, followUser);
router.put("/un-follow/:id", authHandler, unFollowUser);

export default router;
