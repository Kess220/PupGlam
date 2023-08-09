import express from "express";
import { createPost } from "../controllers/postController.js";
import { getAllPosts } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authentication.js";
import { curtirPostagem } from "../controllers/postController.js";
import { getLikesCount } from "../controllers/postController.js";

const router = express.Router();

router.post("/", authenticate, createPost);
router.get("/", authenticate, getAllPosts);
router.post("/:id/curtir", authenticate, curtirPostagem);
router.get("/:id/curtidas", authenticate, getLikesCount);

export default router;
