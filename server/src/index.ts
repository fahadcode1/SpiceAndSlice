import cookieParser from "cookie-parser"
import cors from "cors"
import express from 'express'
import type {Express} from 'express'
import { connectDb } from './lib/db'
import { Request, Response } from "express"
import dns from "dns"
import authRoutes from './routes/auth.route'
import passwordRoutes from './routes/password.routes'
import userRoutes from './routes/user.routes'
import dishRouter from "./routes/dish.routes"
import staffRoutes from "./routes/staff.route"
import orderRoutes from "./routes/order.route"
import paymentRoutes from "./routes/payment.route"
import { handleStripeWebhook } from "./controllers/payment.controller"


dns.setServers(["1.1.1.1", "8.8.8.8"])
const PORT = process.env.PORT ||8000

const app:Express = express()
app.post("/api/webhook/stripe", express.raw({ type: "application/json" }), handleStripeWebhook);

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://drivelegalassistant.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/auth", authRoutes)
app.use("/api/auth", passwordRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin/dishes", dishRouter)
app.use("/api/admin/staffs",staffRoutes)
app.use("/api/user/payments", paymentRoutes);
app.use("/api/admin/orders", orderRoutes)

app.get("/test", (req : Request, res : Response)  =>  {
    res.json({ message: "CORS is working!" })
})


app.listen(PORT, ():void =>{
  console.log(`Server is running on ${PORT}`),
    connectDb()
  
})