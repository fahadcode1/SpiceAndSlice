import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js";
import { connectDb } from "./lib/db.js";
import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDb()
})
