import express from "express"
import { checkSchema } from "express-validator"
import bcrypt from "bcrypt"
import User from "../models/userModel"
import { sequentialValidate } from "../lib/validators/errorHandler"
import { loginSchema, signupSchema } from "../lib/validators/userValidator"
import { createToken, authenticateToken } from "../lib/jwt/jwt"

const router = express.Router()
export default router

router.post(
  "/signup",
  sequentialValidate([checkSchema(signupSchema)]),
  async (req, res) => {
    const { email, password } = req.body

    //check if email is already in use
    const userExists = await User.findOne({ email: { $eq: email } })

    if (userExists) throw new Error("this email is already in use")

    // save email and hashed password to database
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hash })
    if (!user) throw new Error("failed to create account")

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ token })
  }
)

router.post(
  "/login",
  sequentialValidate([checkSchema(loginSchema)]),
  async (req, res) => {
    const { email, password } = req.body

    //check if account exists
    const user = await User.findOne({ email: { $eq: email } })

    if (!user) throw new Error("account does not exist")

    //check if password is correct
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error("invalid username or password")

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ token })
  }
)

router.delete("/", authenticateToken, async (req, res) => {
  const _id = res.locals._id
  const deletedUser = await User.findByIdAndDelete(_id)
  if (!deletedUser)
    return res.status(401).json({ error: "user does not exist" })
  res.status(200).send("user deleted")
})
