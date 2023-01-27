import express from "express"
import { checkSchema, body, validationResult } from "express-validator"
import { validate } from "../lib/validators/errorHandler"
import Workout from "../models/workoutModel"
import {
    workoutidSchema,
    workoutSchema,
} from "../lib/validators/workoutValidator"

const router = express.Router()

//POST a new workout
router.post("/", validate(checkSchema(workoutSchema)), async (req, res) => {
    const user_id = res.locals._id
    const { title, load, reps } = req.body
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(200).json(workout)
})

//GET all workouts
router.get("/", async (req, res) => {
    const user_id = res.locals._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
})

//GET a single workout
router.get("/:id", validate(checkSchema(workoutidSchema)), async (req, res) => {
    const user_id = res.locals._id
    const _id = req.params.id
    const workout = await Workout.findOne({ _id, user_id })
    if (!workout) return res.status(404).json({ error: "No such workout" })
    res.status(200).json(workout)
})

//GET workouts by title
router.get(
    "/findby/title",
    validate(body("title").isString().withMessage("title must be a string")),
    async (req, res) => {
        const { title } = req.body
        const user_id = res.locals._id

        const workouts = await Workout.find({
            title: { $eq: title },
            user_id,
        }).sort({
            createdAt: -1,
        })

        if (!workouts)
            return res.status(404).json({ error: "No matching workout" })

        res.status(200).json(workouts)
    }
)

//UPDATE a workout
router.patch(
    "/:id",
    validate([checkSchema(workoutidSchema), checkSchema(workoutSchema)]),
    async (req, res) => {
        const user_id = res.locals._id
        const _id = req.params.id

        const workout = await Workout.findOneAndUpdate(
            { user_id, _id },
            req.body
        )

        if (!workout) return res.status(404).json({ error: "No such workout" })
        res.status(200).json(workout)
    }
)

//DELETE a workout
router.delete(
    "/:id",
    validate(checkSchema(workoutidSchema)),
    async (req, res) => {
        const user_id = res.locals._id
        const _id = req.params.id
        const workout = await Workout.findOneAndDelete({ _id, user_id })
        if (!workout) return res.status(404).json({ error: "No such workout" })
        res.status(200).json(workout)
    }
)

export default router
