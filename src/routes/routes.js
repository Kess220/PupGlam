import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API da Locadora de Jogos de Tabuleiro!" });
});

export default router;
