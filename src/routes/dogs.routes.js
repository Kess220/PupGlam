import express from "express";
import {
  createDog,
  getDogById,
  getAllDogsByUser,
  updateDogStatus,
} from "../controllers/dogsController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/createdog", authenticate, createDog);
router.get("/alldogs", authenticate, getAllDogsByUser);
router.put("/dogs/:dogId/hiring", authenticate, updateDogStatus);
router.get("/dogs/:dogId", authenticate, getDogById);

export default router;
