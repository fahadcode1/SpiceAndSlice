import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [ true, "Username is required" ],
        unique: [ true, "Username must be unique" ]
    },
    email :{
        type: String,
        required: [true, "Email-is required"],
        unique: true,
        lowercase : true,
        trim: true
    
    },
    verified: {
        type: Boolean,
        default: true
    },

    password : {
        type:String,
        required: [true, "Password is required"],
        minlength:[8, "Password must be atleast 8 character long"]
    },
    cartItems : [
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            }
        }
    ],
    role:{
        type:String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    	resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
}, 

    { timestamps : true}
)


const userModel = mongoose.model("user", userSchema);

export { userModel };