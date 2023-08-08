import express from "express";
import { signup } from "../controllers/signupController.js";

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post("/signup", signup);

export default router;
