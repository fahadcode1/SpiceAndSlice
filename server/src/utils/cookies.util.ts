import { Response } from "express"
import config from "../config/config"

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: config.nodeEnv === "production" ? "none" : "lax",
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: config.nodeEnv === "production" ? "none" : "lax",
    })
}