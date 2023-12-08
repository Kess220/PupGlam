import {
  createDog,
  getAllDogsByUser,
  getDogById,
  updateDogStatus,
} from "../repositories/dogRepository.js";

import {
  InvalidHireableError,
  IsNotANumber,
  MissingFieldError,
  NotFoundError,
} from "../errors/index.js";

export async function createDogService(dog, userId) {
  if (Object.values(dog).some((value) => value === null || value === "")) {
    throw new MissingFieldError();
  }

  if (typeof dog.hireable !== "boolean") {
    throw new InvalidHireableError();
  }

  if (typeof dog.age !== "number") {
    throw new IsNotANumber();
  }

  return await createDog(dog, userId);
}

export async function getAllDogsByUserService(userId) {
  return await getAllDogsByUser(userId);
}

export async function getDogByIdService(dogId) {
  const dog = await getDogById(dogId);

  if (!dog) {
    throw new NotFoundError();
  }

  return dog;
}

export async function updateDogStatusService(dogId, newStatus) {
  const existingDog = await getDogByIdService(dogId);

  if (!existingDog) {
    throw new NotFoundError("Dog not found");
  }

  if (typeof newStatus !== "boolean") {
    throw new InvalidHireableError();
  }

  await updateDogStatus(dogId, newStatus);
}
