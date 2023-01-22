import { Schema } from "express-validator"
import User from "./userModel"
import bcrypt from "bcrypt"

export const signupSchema: Schema = {
  email: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: "email is missing",
      bail: true,
    },
    isEmail: {
      errorMessage: "email is invalid",
      bail: true,
    },
    // email should not be in use
    custom: {
      options: async (email) => {
        // parameterized query
        const user = await User.findOne({ email: { $eq: email } })

        if (user) throw new Error("this email is already in use")

        // Indicates the success of this synchronous custom validator
        return true
      },
      bail: true,
    },
    normalizeEmail: true,
  },

  password: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: "password is missing",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "pasword is too weak",
      bail: true,
    },
  },
}

export const loginSchema: Schema = {
  email: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: "email is missing",
      bail: true,
    },
    isEmail: {
      errorMessage: "email is invalid",
      bail: true,
    },
    normalizeEmail: true,
  },

  password: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: "password is missing",
      bail: true,
    },
    // Email should exist and Password should match
    custom: {
      options: async (password, { req }) => {
        // parameterized query
        const user = await User.findOne({ email: { $eq: req.body.email } })

        if (!user) throw new Error("account does not exist")

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error("invalid username or password")

        return true
      },
      bail: true,
    },
  },
}
