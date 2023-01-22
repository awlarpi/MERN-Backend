import express from "express"
import { checkSchema } from "express-validator"
import { workoutidSchema, workoutSchema } from "../models/workoutValidator"
import { parallelValidate } from "../lib/expressValidator"
import * as workoutController from "../controllers/workoutController"

const router = express.Router()

//POST a new workout
router.post(
  "/",
  parallelValidate(checkSchema(workoutSchema)),
  workoutController.createWorkout
)

//GET all workouts
router.get("/", workoutController.getAllWorkouts)

//GET a single workout
router.get(
  "/:id",
  parallelValidate(checkSchema(workoutidSchema)),
  workoutController.getOneWorkout
)

//UPDATE a workout
router.patch(
  "/:id",
  parallelValidate([checkSchema(workoutidSchema), checkSchema(workoutSchema)]),
  workoutController.updateWorkout
)

//DELETE a workout
router.delete(
  "/:id",
  parallelValidate(checkSchema(workoutidSchema)),
  workoutController.deleteWorkout
)

export default router
