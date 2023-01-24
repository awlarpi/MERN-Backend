import { Schema } from "express-validator"

export const workoutidSchema: Schema = {
  id: {
    in: "params",
    isEmpty: {
      negated: true,
      errorMessage: "workout id is missing",
    },
    isMongoId: {
      errorMessage: "workout id is invalid",
    },
  },
}

export const workoutSchema: Schema = {
  title: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "title is missing",
    },
    isString: {
      errorMessage: "title must be a string",
    },
    trim: true,
  },

  load: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "load is missing",
    },
    isFloat: {
      errorMessage: "load must be a number",
    },
    toFloat: true,
  },

  reps: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "reps is missing",
    },
    isFloat: {
      errorMessage: "reps must be a number",
    },
    toFloat: true,
  },
}
