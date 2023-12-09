import express from "express";
import {
  createPost,
  getAllPosts,
  getLikesCount,
  addComment,
  getCommentsByPostId,
  likePost,
  unlikePost,
} from "../controllers/postController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/", authenticate, createPost);
router.get("/", authenticate, getAllPosts);
router.post("/like/:postId", authenticate, likePost);
router.delete("/unlike/:postId", authenticate, unlikePost);
router.get("/likes/:postId", authenticate, getLikesCount);
router.post("/comment/:postId", authenticate, addComment);
router.get("/comments/:postId", authenticate, getCommentsByPostId);

export default router;
