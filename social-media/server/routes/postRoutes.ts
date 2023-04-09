import {
  createPost,
  deletePost,
  getAllPost,
  getPostsByUser,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/postController";
import express from "express";
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.get("/userPosts/:id", getPostsByUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likePost);
router.get("/timeline/:id", getTimelinePosts);

export default router;
