import dotenv from "dotenv"
import { set, connect } from "mongoose"
import workoutRoutes from "./routes/workoutRoutes"
import userRoutes from "./routes/userRoutes"
import express from "express"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

dotenv.config()

//parse all json data
app.use(express.json())

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/workouts", cors(corsOptions), workoutRoutes)
app.use("/api/user", cors(corsOptions), userRoutes)

set("strictQuery", false)

connect(process.env.MONGO_URI!)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port 4000")
        })
    })
    .catch(() => console.error("Failed to connect to database"))
