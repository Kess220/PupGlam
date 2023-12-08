import { loginUser } from "../services/signInService.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json(result);
};
