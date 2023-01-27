import { Schema } from "express-validator"

export const signupSchema: Schema = {
    email: {
        in: "body",
        isEmail: {
            errorMessage: "email is invalid",
            bail: true,
        },
        normalizeEmail: true,
    },

    password: {
        in: "body",
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
        isEmail: {
            errorMessage: "email is invalid",
            bail: true,
        },
        normalizeEmail: true,
    },

    password: {
        in: "body",
        isString: {
            errorMessage: "pasword must be a string",
            bail: true,
        },
    },
}

export const deleteSchema: Schema = {
    password: {
        in: "body",
        isString: {
            errorMessage: "pasword must be a string",
            bail: true,
        },
    },
}
