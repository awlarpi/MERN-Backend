import { NextFunction, Request, Response } from "express"
import { Types } from "mongoose"
import jwt from "jsonwebtoken"

export function createToken(_id: Types.ObjectId) {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET!, { expiresIn: "3d" })
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ error: "user not logged in" })

  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!)
    res.locals._id = decoded._id
    next()
  } catch (err) {
    res.status(401).json({ error: "invalid token" })
  }
}
