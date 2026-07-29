import { Schema, model, Document, Types } from "mongoose";

export interface IDish extends Document {
  name: string;
  description?: string;
  price: number;
  type: string;
  offers : string
  photoUrl?: string; // for now simple string, will add upload logic later
  isAvailable: boolean;
  stock : number
  createdAt: Date;
  updatedAt: Date;
}

const dishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, index: true },
    photoUrl: { type: String },
    offers : {type : String},
    isAvailable: { type: Boolean, default: true },
    stock : {type : Number},
  },
  { timestamps: true }
);

export const Dish = model<IDish>("Dish", dishSchema);