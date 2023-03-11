import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { set, connect } from "mongoose"
import morgan from "morgan"
import workoutRouter from "./routes/workoutRoutes"
import userRouter from "./routes/userRoutes"
import * as e from "./lib/errors/errorMiddleware"
import { authenticateToken } from "./lib/jwt/jwt"
import http from "http"
import { Server } from "socket.io"
import User from "./models/userModel"

dotenv.config()
set("strictQuery", false)

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const corsOptions = { origin: "*" }
const port = process.env.PORT || 4000

// logging and cors and convert to json
app.use(morgan("dev"), cors(corsOptions), express.json())

// Websocket Testing
io.on("connection", (socket) => {
  console.log("A user connected!")

  socket.on("joinRoom", (data) => {
    // data will look like => {myID: "123123"}
    console.log("user joined room")
    socket.join(data.myID)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected!")
  })
})

// Routes
app.use("/api/user", userRouter)
app.use("/api/workouts", authenticateToken, workoutRouter)
app.use(e.errorLogger, e.errorResponder, e.failSafeHandler)

function serverStartCallback() {
  console.log(`\x1b[33mServer started! Listening on port ${port}...\x1b[0m`)

  User.watch().on("change", (change) => {
    console.log(change)
    io.emit("changes", change)
  })
}

connect(process.env.MONGO_URI!)
  .then(() => {
    server.listen(port, serverStartCallback)
  })
  .catch(() => console.error("Error! Failed to connect to database!"))
