import express from "express"
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import sessionModel from "../models/session.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import mongoose from "mongoose"

export const signup = async (req, res) => {
    const { username, password, email } = req.body

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: "All fields must be filled" })
        }

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken =  Math.floor(1000 + Math.random() * 9000).toString()
    

        const user = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if(!email){
            res.status(400).json({
                success: false,
                message: "Email is not registered"
            })

        if (!user.verified) {
            res.status(400).json({
                success: false,
                message: "Email is not verfied"
            })
        }    
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            res.status(400).json({
                success : false,
                message: "Bad credentials"
            })}
         

        // Refresh Token    
        const refreshToken = jwt.sign(
            {id : user._id},
            config.JWT_SECRET,
            {expiresIn: "7d"}

        )
                  
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.create({
            user : user._id,
            refreshTokenHash,
            ip : req.ip,
            userAgent : req.header["user-agent"]
        })
        
        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        )

        res.cookie("refreshToken", refreshToken,{
            httpOnly : true,
            secure: true,
            sameSite : "secure",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message : "Logged in Successfully",
            user : {
                username : user.username,
                emial   : user.email
            },
            accessToken,
        })

        }

    } catch(error){

    }
}

