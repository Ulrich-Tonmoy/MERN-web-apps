import { createPost, getAllPostsByUser, getPost } from "../controllers/postController";
import express from "express";
const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.get("/userPosts/:id", getAllPostsByUser)

export default router;