import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import User from "../models/userModel"

// signup user
export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body

  const hash = await bcrypt.hash(password, 10).catch(next)
  const user = await User.create({ email, password: hash }).catch(next)

  res.status(200).json(user)
}

// login user
export async function returnUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).json("Login successful")
}
