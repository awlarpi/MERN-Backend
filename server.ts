import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { set, connect } from "mongoose"
import morgan from "morgan"
import workoutRouter from "./routes/workoutRoutes"
import userRouter from "./routes/userRoutes"
import * as e from "./lib/errors/errorMiddleware"
import { authenticateToken } from "./lib/jwt/jwt"

dotenv.config()
set("strictQuery", false)

const app = express()
const corsOptions = { origin: "*" }

// logging and cors and convert to json
app.use(morgan("dev"), cors(corsOptions), express.json())

// routes
app.use("/api/user", userRouter)
app.use("/api/workouts", authenticateToken, workoutRouter)

// error handlers
app.use(e.errorLogger, e.errorResponder, e.failSafeHandler)

connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started! Listening on port 4000...")
        })
    })
    .catch(() => console.error("Failed to connect to database"))
