import httpStatus from "http-status";
import {
  UserExistsError,
  EmailOrPasswordInvalidError,
} from "../errors/index.js";

export function handleGlobalErrors(err, req, res, next) {
  console.error(err);

  if (err instanceof UserExistsError) {
    return res.status(httpStatus.CONFLICT).json({ message: err.message });
  }

  if (err instanceof EmailOrPasswordInvalidError) {
    return res.status(httpStatus.CONFLICT).json({ message: err.message });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: "Erro interno do servidor",
    message: err.message,
  });
}
