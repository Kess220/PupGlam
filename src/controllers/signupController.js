import { signupUser } from "../services/signUpService.js";

export const signup = async (req, res) => {
  const newUser = await signupUser(req.body);

  return res
    .status(201)
    .json({ message: "Usuário criado com sucesso", user: newUser });
};
