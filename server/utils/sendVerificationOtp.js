import nodemailer from 'nodemailer'
import bcrypt, { hash } from 'bcryptjs'
import { generateOtp } from './generateOtp.js'

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_APP_PASS
    }
})

export const sendVerificationOtp = async (user) => {
    const otp = generateOtp()
    const hashedOtp = await bcrypt.hash(otp, 10)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    user.otp = hashedOtp
    user.otpExpiry = otpExpiry

    await user.save()

    await transporter.sendMail({
        from : `"App Name" <${process.env.GMAIL_USER}>`,
        to   :   user.email,
        subject : 'Your Verification OTP for DriveLegalChatBot',
        text : `Your OTP is ${otp}. Valid for 10 minutes. Do not share this with anyone.`
    })
}