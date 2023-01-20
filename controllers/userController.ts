import { Request, Response } from "express"
import User from "../models/userModel"

// login user
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        res.status(200).json(user)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
export async function signupUser(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        res.status(200).json(user)
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}
