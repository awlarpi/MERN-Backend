import express from "express"
import { checkSchema, body, validationResult } from "express-validator"
import {
  workoutidSchema,
  workoutSchema,
} from "../lib/validators/workoutValidator"
import { parallelValidate } from "../lib/validators/errorHandler"
import Workout from "../models/workoutModel"

const router = express.Router()

//POST a new workout
router.post(
  "/",
  parallelValidate([checkSchema(workoutSchema)]),
  async (req, res) => {
    const { title, load, reps } = req.body
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  }
)

//GET all workouts
router.get("/", async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })
  res.status(200).json(workouts)
})

//GET a single workout
router.get(
  "/:id",
  parallelValidate([checkSchema(workoutidSchema)]),
  async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    if (!workout) return res.status(404).json({ error: "No such workout" })
    res.status(200).json(workout)
  }
)

//GET workouts by title
router.get(
  "/findby/title",
  parallelValidate([
    body("title").isString().withMessage("title must be a string"),
  ]),
  async (req, res) => {
    const { title } = req.body

    const workouts = await Workout.find({ title: { $eq: title } }).sort({
      createdAt: -1,
    })

    if (!workouts) return res.status(404).json({ error: "No matching workout" })
    
    res.status(200).json(workouts)
  }
)

//UPDATE a workout
router.patch(
  "/:id",
  parallelValidate([checkSchema(workoutidSchema), checkSchema(workoutSchema)]),
  async (req, res) => {
    const id = req.params.id
    const workout = await Workout.findByIdAndUpdate(id, req.body)
    if (!workout) return res.status(404).json({ error: "No such workout" })
    res.status(200).json(workout)
  }
)

//DELETE a workout
router.delete(
  "/:id",
  parallelValidate([checkSchema(workoutidSchema)]),
  async (req, res) => {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    if (!workout) return res.status(404).json({ error: "No such workout" })
    res.status(200).json(workout)
  }
)

export default router
