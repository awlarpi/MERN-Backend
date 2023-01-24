import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { set, connect } from "mongoose"
import morgan from "morgan"
import workoutRouter from "./routes/workoutRoutes"
import userRouter from "./routes/userRoutes"
import * as e from "./lib/errors/errorMiddleware"

dotenv.config()
set("strictQuery", false)

const app = express()
const corsOptions = { origin: "*" }

// middleware
app.use(morgan("dev"), express.json())

// routes
app.use("/api/user", cors(corsOptions), userRouter)
app.use("/api/workouts", cors(corsOptions), workoutRouter)

// error handlers
app.use(e.errorLogger, e.errorResponder, e.failSafeHandler)

connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started successfully! Listening on port 4000...")
    })
  })
  .catch(() => console.error("Failed to connect to database"))
