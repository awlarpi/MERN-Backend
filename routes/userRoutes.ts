import express from "express"
import { checkSchema } from "express-validator"
import bcrypt from "bcrypt"
import User from "../models/userModel"
import { validate } from "../lib/validators/errorHandler"
import { createToken, authenticateToken } from "../lib/jwt/jwt"
import {
    deleteSchema,
    loginSchema,
    signupSchema,
} from "../lib/validators/userValidator"

const router = express.Router()
export default router

router.post(
    "/signup",
    validate(checkSchema(signupSchema)),
    async (req, res) => {
        const { email, password } = req.body

        //check if email is already in use
        const userExists = await User.findOne({ email: { $eq: email } })

        if (userExists)
            return res.status(400).send("error: email already in use")

        const hash = await bcrypt.hash(password, 10)

        // save user to database
        const user = await User.create({ email, password: hash })

        if (!user)
            return res.status(400).send("error: failed to create account")

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    }
)

router.post("/login", validate(checkSchema(loginSchema)), async (req, res) => {
    const { email, password } = req.body

    //check if account exists
    const user = await User.findOne({ email: { $eq: email } })

    if (!user) return res.status(400).send("error: user not found")

    //check if password is correct
    const match = await bcrypt.compare(password, user.password)

    if (!match)
        return res.status(400).send("error: invalid username or password")

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
})

router.delete(
    "/delete",
    validate(checkSchema(deleteSchema)),
    authenticateToken,
    async (req, res) => {
        const _id = res.locals._id

        // fetch user information
        const user = await User.findById(_id)
        if (!user) return res.status(400).send("error: user not found")

        //check if password is valid
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).send("error: invalid password")

        // delete user
        const deletedUser = await User.findByIdAndDelete(_id)
        if (!deletedUser)
            return res.status(400).json({ error: "error deleting account" })

        res.status(200).send("user deleted")
    }
)
