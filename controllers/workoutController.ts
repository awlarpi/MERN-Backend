import Workout from "../models/workoutModel"
import { Request, Response } from "express"
import { Types } from "mongoose"

// get all workouts
export async function getAllWorkouts(req: Request, res: Response) {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

// get a single workout
export async function getOneWorkout(req: Request, res: Response) {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)
}

// create a new workout
export async function createWorkout(req: Request, res: Response) {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!load) {
        emptyFields.push("load")
    }
    if (!reps) {
        emptyFields.push("reps")
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all the fields", emptyFields })
    }

    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
export async function deleteWorkout(req: Request, res: Response) {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout" })
    }

    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)
}

// update a workout
export async function updateWorkout(req: Request, res: Response) {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout id" })
    }

    const workout = await Workout.findByIdAndUpdate(id, { ...req.body })

    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)
}
