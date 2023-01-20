import { Schema, model } from "mongoose"

const schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

const Workout = model("Workout", schema)
export default Workout
