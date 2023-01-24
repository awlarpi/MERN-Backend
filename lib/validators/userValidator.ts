import { Schema } from "express-validator"

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
    normalizeEmail: true,
  },

  password: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: "password is missing",
      bail: true,
    },
    isString: {
      errorMessage: "pasword must be a string",
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
    isString: {
      errorMessage: "pasword must be a string",
      bail: true,
    },
  },
}
