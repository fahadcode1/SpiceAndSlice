import userModel from "../models/userModel";
import { Order } from "../models/order.Model";
import { Request, Response } from "express";
import config from '../config/config'
import mongoose from "mongoose"
import sessionModel from "../models/sessionModel"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import { sendEmailVerificationOtp } from '../utils/mailer'
import { JwtPayload } from "jsonwebtoken"

export const handleStaffLogin = async (req: Request, res: Response) => {
  try {
    const { email, mobileNumber, password } = req.body;

    if (!password || (!email && !mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number, and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(mobileNumber ? [{ mobileNumber }] : []),
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or Mobile Number is not registered",
      });
    }

    if (!user.isVerifiedEmail) {
      await sendEmailVerificationOtp(user);

      return res.status(403).json({
        success: false,
        message: "Email not verified. OTP sent to your email.",
        email: user.email,
        redirectTo: "/verify-email",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const allowedRoles = ["ADMIN", "MANAGER", "OWNER"];
    if (!allowedRoles.includes(user.role)) {
      console.warn(`Blocked staff-login attempt by USER: ${user.email}`);
      return res.status(403).json({
        success: false,
        message:
          "Only for Staffs 😂",
      });
    }

    const sessionId = new mongoose.Types.ObjectId();

    const refreshToken: string = jwt.sign(
      { id: user._id, sessionId },
      config.jwtRefreshSecret as string,
      { expiresIn: "7d" }
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      _id: sessionId,
      user: user._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      refreshTokenHash,
    });

    const accessToken = jwt.sign(
      { id: user._id, sessionId: session._id },
      config.jwtAccessSecret as string,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: config.nodeEnv === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: config.nodeEnv === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        user: user.firstName,
        Email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Staff login error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staff = await userModel
            .find({ role: { $in: ["ADMIN", "MANAGER", "OWNER"] } })
            .select("firstName lastName email mobileNumber role")

        return res.status(200).json({
            success: true,
            count: staff.length,
            staff
        })
    } catch (err) {
        console.log("Get All Staff Error", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

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

const STATUS_FLOW = [
  "pending",
  "approved",
  "cooking",
  "packing",
  "out_for_delivery",
  "payment_completed",
  "order_completed",
] as const;

// 1. Get all orders (staff/admin view)
export async function getAllOrders(req: Request, res: Response) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (req.query.status && typeof req.query.status === "string") {
      filter.status = req.query.status;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("orderItems.dish", "name photoUrl price")
        .populate("user", "firstName lastName email mobileNumber")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getAllOrders controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// 2. Update order status (staff action: approve, cooking, packing, out_for_delivery, payment_received)
export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!STATUS_FLOW.includes(status) && status !== "cancelled") {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "cancelled" || order.status === "order_completed") {
      return res.status(400).json({
        success: false,
        message: `Cannot update order once it is ${order.status}`,
      });
    }

    order.status = status;

    if (status === "out_for_delivery") order.shippedAt = new Date();
    if (status === "payment_completed" || status === "order_completed") order.deliveredAt = new Date();

    await order.save();

    return res.status(200).json({
      success: true,
      message: `Order marked as ${status}`,
      order,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}