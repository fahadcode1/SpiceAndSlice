import userModel from "../models/userModel";
import { Request, Response } from "express";


export const handlepromoteAdmin = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }
        const newAdmin = await userModel.findOne({ email: targetEmail })
        if (!newAdmin) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (!newAdmin.isVerifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified, Please verify Email"
            })
        }
        if (newAdmin.role !== "USER") {
            return res.status(400).json({
                success: false,
                message: "Only regular users can be promoted to admin"
            })
        }

        newAdmin.role = "ADMIN"
        await newAdmin.save()

        return res.status(200).json({
            success: true,
            message: `${newAdmin.email} promoted to admin`,
            user: { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role }
        })

    } catch (err) {
        console.log("Promote Admin Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const handleDemoteAdmin = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }
        const demotedAdmin = await userModel.findOne({ email: targetEmail })
        if (!demotedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (demotedAdmin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "Only admins can be demoted to regular users"
            })
        }

        demotedAdmin.role = "USER"
        await demotedAdmin.save()

        return res.status(200).json({
            success: true,
            message: `${demotedAdmin.email} demoted to regular user`,
            user: { id: demotedAdmin._id, email: demotedAdmin.email, role: demotedAdmin.role }
        })

    } catch (err) {
        console.log("Demote Admin Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const handlepromoteManager = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }
        const newManager = await userModel.findOne({ email: targetEmail })
        if (!newManager) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (!newManager.isVerifiedEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified, Please verify Email"
            })
        }
        if (newManager.role !== "USER" && newManager.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "Only regular users or admins can be promoted to Manager"
            })
        }

        newManager.role = "MANAGER"
        await newManager.save()

        return res.status(200).json({
            success: true,
            message: `${newManager.email} promoted to Manager`,
            user: { id: newManager._id, email: newManager.email, role: newManager.role }
        })

    } catch (err) {
        console.log("Promote Manager Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const handleDemoteManager = async (req: Request, res: Response) => {
    try {
        const targetEmail = req.body.email
        if (!targetEmail) {
            return res.status(400).json({
                success: false,
                message: "Valid email required"
            })
        }
        const demotedManger = await userModel.findOne({ email: targetEmail })
        if (!demotedManger) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist"
            })
        }
        if (demotedManger.role !== "MANAGER") {
            return res.status(400).json({
                success: false,
                message: "Only a manager can be demoted to regular user"
            })
        }

        demotedManger.role = "USER"
        await demotedManger.save()

        return res.status(200).json({
            success: true,
            message: `${demotedManger.email} demoted to regular user`,
            user: { id: demotedManger._id, email: demotedManger.email, role: demotedManger.role }
        })

    } catch (err) {
        console.log("Demote Manager Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}