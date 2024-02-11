import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import tweetRouter from  "./routes/tweet.route.js"
import commentRouter from "./routes/comment.route.js"
import playlistRouter from "./routes/playlist.route.js"


app.use("/api/v1/users",userRouter);
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/playlist", playlistRouter)
export { app }