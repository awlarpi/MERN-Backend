import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { set, connect } from "mongoose"
import morgan from "morgan"

import workoutRoutes from "./routes/workoutRoutes"
import userRoutes from "./routes/userRoutes"
import * as middleware from "./lib/errorMiddleware"

dotenv.config()
set("strictQuery", false)

const app = express()
const corsOptions = { origin: "*" }

// middleware
app.use(morgan("dev"))
app.use(express.json())

// routes
app.use("/api/workouts", cors(corsOptions), workoutRoutes)
app.use("/api/user", cors(corsOptions), userRoutes)

// error handlers
app.use(middleware.errorLogger)
app.use(middleware.errorResponder)
app.use(middleware.failSafeHandler)

connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started successfully! Listening on port 4000...")
    })
  })
  .catch(() => console.error("Failed to connect to database"))
