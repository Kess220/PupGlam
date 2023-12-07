import { UserExistsError } from "../errors/UserExistsError.js";

export function handleGlobalErrors(err, req, res, next) {
  console.error(err);

  if (err instanceof UserExistsError) {
    return res.status(409).json({ error: err.name, message: err.message });
  }

  res.status(500).json({
    error: "Erro interno do servidor",
    message: err.message,
  });
}
