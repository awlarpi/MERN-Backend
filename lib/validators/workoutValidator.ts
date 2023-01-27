import { Schema } from "express-validator"

export const workoutidSchema: Schema = {
    id: {
        in: "params",
        isMongoId: {
            errorMessage: "workout id is invalid",
        },
    },
}

export const workoutSchema: Schema = {
    title: {
        in: ["body"],
        isString: {
            errorMessage: "title must be a string",
        },
        trim: true,
    },

    load: {
        in: ["body"],
        isFloat: {
            errorMessage: "load must be a number",
        },
        toFloat: true,
    },

    reps: {
        in: ["body"],
        isFloat: {
            errorMessage: "reps must be a number",
        },
        toFloat: true,
    },
}
