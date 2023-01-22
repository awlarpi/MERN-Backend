import Workout from "../models/workoutModel"
import { Request, Response, NextFunction } from "express"

// create a new workout NOT SAFE, need validation
export async function createWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, load, reps } = req.body

  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    next(error)
  }
}

// get all workouts SAFE
export async function getAllWorkouts(req: Request, res: Response) {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })

  res.status(200).json(workouts)
}

// get a single workout SAFE
export async function getOneWorkout(req: Request, res: Response) {
  const workout = await Workout.findById(req.params.id)

  if (!workout) return res.status(404).json({ error: "No such workout" })

  res.status(200).json(workout)
}

// update a workout NOT SAFE, need input validation
export async function updateWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, {
      ...req.body,
    })

    if (!workout) return res.status(404).json({ error: "No such workout" })

    res.status(200).json(workout)
  } catch (error) {
    next(error)
  }
}

// delete a workout SAFE
export async function deleteWorkout(req: Request, res: Response) {
  const workout = await Workout.findByIdAndDelete(req.params.id)

  if (!workout) return res.status(404).json({ error: "No such workout" })

  res.status(200).json(workout)
}
