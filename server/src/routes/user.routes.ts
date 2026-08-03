import express from "express"
import { verifyEmailOTP } from "../middleware/verifyEmailOTP.middleware"
import {handleGetMe, 
        handleChangeName,
        handleChangeEmail,
        handleSendEmailOtp,
        handleDeleteAccount,
        handleChangeMobileNumber,
        handleVerifyPendingEmail,
        handleChangePassword
        
    } from "../controllers/user.controller"
import { authMiddleware } from "../middleware/auth.middleware"
import { handleAddAddress, handleUpdateAddress, handleDeleteAddress } from "../controllers/userAddress.controller"
import { createOrder, getUserOrders, cancelOrder } from "../controllers/order.controller"
import { getAllDishes } from "../controllers/dish.controller"
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller"




const userRoutes = express.Router()

userRoutes.get('/get-me', authMiddleware, handleGetMe)
userRoutes.post('/send-email-otp', authMiddleware, handleSendEmailOtp)
userRoutes.post('/verify-email', authMiddleware, handleVerifyPendingEmail)

    // user-account routes
userRoutes.patch('/change-mobile', authMiddleware, verifyEmailOTP, handleChangeMobileNumber)
userRoutes.patch('/change-password', authMiddleware, handleChangePassword)
userRoutes.patch('/change-name', authMiddleware, handleChangeName)
userRoutes.patch('/change-email', authMiddleware, handleChangeEmail)
userRoutes.patch('/verify-pending-email', authMiddleware, handleVerifyPendingEmail)
userRoutes.delete('/delete-account', authMiddleware, handleDeleteAccount)

// user address routes
userRoutes.post("/address", authMiddleware, handleAddAddress)
userRoutes.put("/address/:addressId", authMiddleware, handleUpdateAddress)
userRoutes.delete("/address/:addressId", authMiddleware, handleDeleteAddress)

// user orders
userRoutes.post("/orders", authMiddleware, createOrder)
userRoutes.get("/orders", authMiddleware, getUserOrders)
userRoutes.patch("/orders/:orderId/cancel", authMiddleware, cancelOrder)

// user dish routes
userRoutes.get("/dishes", getAllDishes); 

//user cart routes

userRoutes.get("/cart", authMiddleware, getCart)
userRoutes.post("/cart", authMiddleware, addToCart)
userRoutes.delete("/cart/:dishId", authMiddleware, removeFromCart)

export default userRoutes