import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js";
import { connectDb } from "./lib/db.js";
import 'dotenv/config';

import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
console.log("ENV CHECK:", process.env.JWT_ACCESS_SECRET);


app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDb()
})
