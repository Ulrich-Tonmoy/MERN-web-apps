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
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("file"), createPost);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.get("/userPosts/:id", getPostsByUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likePost);
router.get("/timeline/:id", getTimelinePosts);

export default router;
