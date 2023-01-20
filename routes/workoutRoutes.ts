import express from "express"
import * as workoutController from "../controllers/workoutController"

const router = express.Router()

//GET all workouts
router.get("/", workoutController.getAllWorkouts)

//GET a single workout
router.get("/:id", workoutController.getOneWorkout)

//POST a new workout
router.post("/", workoutController.createWorkout)

//DELETE a workout
router.delete("/:id", workoutController.deleteWorkout)

//UPDATE a workout
router.patch("/:id", workoutController.updateWorkout)

export default router
