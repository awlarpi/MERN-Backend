import express from "express"
import { checkSchema } from "express-validator"
import * as userController from "../controllers/userController"
import { sequentialValidate } from "../lib/expressValidator"
import { loginSchema, signupSchema } from "../models/userValidator"

const router = express.Router()

//signup route
router.post(
  "/signup",
  sequentialValidate(checkSchema(signupSchema)),
  userController.createNewUser
)

//login route
router.post(
  "/login",
  sequentialValidate(checkSchema(loginSchema)), // ensures that user is authenticated
  userController.returnUserData // user is now logged in, return user data
)

export default router
