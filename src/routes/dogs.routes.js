import express from "express";
import { cadastrarDogs } from "../controllers/dogsController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/", authenticate, cadastrarDogs);

export default router;
