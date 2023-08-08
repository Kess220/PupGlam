import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const jwtSecret = process.env.JWT_SECRET || "chave_padrao";
  if (!token) {
    console.log("Token de autenticação não fornecido");
    return res
      .status(401)
      .json({ error: "Token de autenticação não fornecido." });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    req.user = decodedToken;
    console.log("Usuário autenticado com ID:", req.user.userId);
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};
