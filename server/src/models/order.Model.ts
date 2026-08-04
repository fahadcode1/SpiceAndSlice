
import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
  dish: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IPaymentResult {
  method: "COD" | "STRIPE";
  id?: string;
  status?: "pending" | "paid" | "verified" | "failed";
  verifiedBy?: Types.ObjectId;
  verifiedAt?: Date;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult: IPaymentResult;
  totalPrice: number;
  status: "pending" | "approved" | "cooking" | "packing" | "out_for_delivery" | "payment_completed" | "order_completed" | "cancelled";
  deliveredAt?: Date;
  shippedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema<IShippingAddress>(
  {
    fullName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: [orderItemSchema],
    shippingAddress: { type: shippingAddressSchema, required: true },
    paymentResult: {
      method: { type: String, enum: ["COD", "STRIPE"], required: true, default: "COD" },
      id: String,
      status: { type: String, enum: ["pending", "paid", "verified", "failed"], default: "pending" },
      verifiedBy: { type: Schema.Types.ObjectId, ref: "user" },
      verifiedAt: Date,
    },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "cooking", "packing", "out_for_delivery", "payment_completed", "order_completed", "cancelled"],
      default: "pending",
    },
    deliveredAt: { type: Date },
    shippedAt: { type: Date },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);