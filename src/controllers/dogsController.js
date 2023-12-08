import {
  createDogService,
  getAllDogsByUserService,
  getDogByIdService,
  updateDogStatusService,
} from "../services/dogService.js";

export async function createDog(req, res) {
  const dog = req.body;
  const userId = req.user.userId;

  const dogCreated = await createDogService(dog, userId);
  res.status(201).json({
    message: "Dog created successfully",
    dog: dogCreated,
  });
}

export async function getAllDogsByUser(req, res) {
  const userId = req.user.userId;
  const dogs = await getAllDogsByUserService(userId);
  return res.status(200).json({ dogs: dogs });
}

export async function getDogById(req, res) {
  const dogId = req.params.dogId;
  const dog = await getDogByIdService(dogId);
  return res.status(200).json({ dog: dog });
}

export async function updateDogStatus(req, res) {
  const { dogId } = req.params;
  const { newStatus } = req.body;

  await updateDogStatusService(dogId, newStatus);

  return res.status(200).json({ message: "Dog status updated successfully" });
}
