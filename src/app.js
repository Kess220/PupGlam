import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import { db } from "./config/dbConfig.js";
import routes from "./routes/routes.js";
import signupRoutes from "./routes/signup.routes.js";
import signinRoutes from "./routes/signin.routes.js";
import postRoutes from "./routes/post.routes.js";
import dogsRoutes from "./routes/dogs.routes.js";
import cors from "cors";
import { handleGlobalErrors } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/api", routes);
app.use("/", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/post", postRoutes);
app.use("/", dogsRoutes);
app.use(handleGlobalErrors);

db.connect((err, client, done) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err);
    return;
  }

  console.log("Conexão com o banco de dados estabelecida com sucesso!");

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
