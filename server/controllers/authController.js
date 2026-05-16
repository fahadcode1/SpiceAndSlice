import express from "express"
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async(req,res) => {
    const {name, email, password} = req.body


    try {
        if (!name || !email || !password)   {
          return  res.status(400).json({success : false, message : "Fill All input fields"})
            const userAlreadyExists = user.findOne({email})
            if (userAlreadyExists) {
                return res.status(400).json({success: false, message: "Email Already Exist"})
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            //  const verificationToken = GenerateverificationToken()

            const user = new User({
                name,
                email,
                password : hashedPassword,
                verificationToken,
                verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000
            })
            await user.save()

            //  generateTokenAndSetCookie(res, user._id)
            res.status(200).json({
                success: true,
                message: "Bhadwa User Created",
                user: {
                    ...user._doc,
                    password : undefined
                }
            })
        } 

    }   catch(error){
            res.status(500).json({
                sucess: false,
                message: error.message
            })
    } 
}
