import httpStatus from "http-status";
import {
  UserExistsError,
  EmailOrPasswordInvalidError,
  InvalidHireableError,
  MissingFieldError,
  IsNotANumber,
  NotFoundError,
} from "../errors/index.js";

export function handleGlobalErrors(err, req, res, next) {
  console.error(err);

  if (err instanceof UserExistsError) {
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }

  if (err instanceof EmailOrPasswordInvalidError) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }
  if (
    err instanceof InvalidHireableError ||
    err instanceof MissingFieldError ||
    err instanceof IsNotANumber
  ) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "Erro interno do servidor",
    message: err.message,
  });
}
