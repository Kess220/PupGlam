import express from "express";
import { cadastrarDogs } from "../controllers/dogsController.js";
import { authenticate } from "../middlewares/authentication.js";
import { listarCachorrosPorUsuario } from "../controllers/dogsController.js";
import { toggleContratacao } from "../controllers/dogsController.js";
import { obterCachorroPorId } from "../controllers/dogsController.js";

const router = express.Router();

router.post("/cadastrodog", authenticate, cadastrarDogs);
router.get("/cachorros", authenticate, listarCachorrosPorUsuario);
router.put(
  "/cachorros/:cachorroId/contratacao",
  authenticate,
  toggleContratacao
);
router.get("/cachorros/:cachorroId", authenticate, obterCachorroPorId);

export default router;
