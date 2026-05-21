import express from "express"
import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "node:crypto";
import jwt from "jsonwebtoken"
import sessionModel from "../models/session.model.js"
import mongoose from "mongoose"



export const register = async (req, res) => {


    try {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isAlreadyRegistered) {
       return res.status(409).json({
            message: "Username or email already exists"
        })
    }

        const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    // const otp = generateOtp();
    // const html = getOtpHtml(otp);

    // const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    // await otpModel.create({
    //     email,
    //     user: user._id,
    //     otpHash
    // })

    // await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        },
    })
}  catch (err) {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email already registered" });
  }
  res.status(500).json({ message: "Server error" });
}


}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // comment this out while testing since OTP flow is disabled
        // if (!user.verified) {
        //     return res.status(401).json({ message: "Email not verified" });
        // }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        });

        const accessToken = jwt.sign(
            { id: user._id, sessionId: session._id },
             process.env.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Logged in successfully",
            user: {
                username: user.username,
                email: user.email,
            },
            accessToken,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const logout = async (req, res) =>   {

}
