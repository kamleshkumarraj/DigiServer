import { asyncErrorHandler } from "../errors/asynError";

export const register = asyncErrorHandler(async (req, res, next) => {
  const {fistName, lastName, email, username, password} = req.body;
})