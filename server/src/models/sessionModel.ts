import mongoose, { Document, Schema, Types } from "mongoose"


export interface ISession extends Document {
  user: Types.ObjectId
  refreshTokenHash: string
  previousRefreshTokenHash: string | null
  rotatedAt: Date | null
  ip: string
  userAgent: string
  revoked: boolean
}

const sessionSchema = new Schema<ISession>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "User is required" ]
    },
    refreshTokenHash: {
        type: String,
        required: [ true, "Refresh token hash is required" ]
    },
    previousRefreshTokenHash: {
        type: String,
        default: null
    },
    rotatedAt: {
        type: Date,
        default: null
    },
    ip: {
        type: String,
        required: [ true, "IP address is required" ]
    },
    userAgent: {
        type: String,
        required: [ true, "User agent is required" ]
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const sessionModel = mongoose.model<ISession>("sessions", sessionSchema)


export default sessionModel