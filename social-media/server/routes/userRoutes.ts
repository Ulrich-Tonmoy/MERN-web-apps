import {
  deleteUser,
  followUser,
  getAllUsers,
  getUserById,
  unFollowUser,
  updateUser,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/follow/:id", followUser);
router.put("/un-follow/:id", unFollowUser);

export default router;
