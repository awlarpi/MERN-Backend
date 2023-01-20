import express from "express"
import * as userController from "../controllers/userController"

const router = express.Router()

//login route
router.post("/login", userController.loginUser)

//signup route
router.post("/signup", userController.signupUser)

export default router
