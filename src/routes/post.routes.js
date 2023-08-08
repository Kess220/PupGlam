import express from "express";
import { createPost } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/", authenticate, createPost);

export default router;
