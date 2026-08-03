import mongoose, { Document, Schema, Types } from "mongoose"

export interface IAddress {
  _id?: Types.ObjectId;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  pendingEmail?: string | undefined
  isVerifiedPendingEmail : boolean
  isVerifiedEmail: boolean
  mobileNumber?: string
  isVerifiedMobileNumber: boolean
  password: string
  role: "USER" | "ADMIN" | "MANAGER" | "OWNER"
  emailOtp?: string | undefined
  emailOtpExpiry?: Date | undefined
  mobileNumberOtp?: string | undefined
  mobileNumberOtpExpiry?: Date | undefined
  resetPasswordToken?: string | undefined
  resetPasswordExpiresAt?: Date
  addresses?: Types.DocumentArray<IAddress>
}

const addressSchema = new Schema<IAddress>({
  streetAddress: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipcode: { type: String, required: false },
  country: { type: String, required: false },
})
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    pendingEmail: { type: String, default: null },
    isVerifiedPendingEmail : { type: Boolean, default: false },
    isVerifiedEmail: { type: Boolean, default: false },
    mobileNumber: { type: String, unique: true, required: false, sparse: true },
    isVerifiedMobileNumber: { type: Boolean, default: false },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MANAGER", "OWNER",],
      default: "USER",
    },
    emailOtp: { type: String },
    emailOtpExpiry: { type: Date },
    mobileNumberOtp: { type: String },
    mobileNumberOtpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    addresses: [addressSchema],
  },
  { timestamps: true }
)

const userModel = mongoose.model<IUser>("user", userSchema)

export default userModel