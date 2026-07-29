import { Request, Response } from "express";
import { Dish } from "../models/dishModel";
import mongoose from "mongoose";



export const getAllDishes = async (req: Request, res: Response) => {
    try {
        const dishes = await Dish.find()

        return res.status(200).json({
            success: true,
            count: dishes.length,
            dishes
        })
    } catch (err) {
        console.error("Get All Dishes error:", err)
        return res.status(500).json({ success: false, message: "Failed to fetch dishes" })
    }
}


export const createDish = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      type,
      offers,
      photoUrl,
      isAvailable,
      stock,
    } = req.body;

    const requiredFields = {
      name,
      description,
      price,
      type,
      offers,
      photoUrl,
      isAvailable,
      stock,
    };

    // Validate required fields
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    // Check if dish already exists
    const existingDish = await Dish.findOne({ name });

    if (existingDish) {
      return res.status(409).json({
        success: false,
        message: "Dish already exists",
      });
    }

    // Create new dish
    const newDish = await Dish.create({
      name,
      description,
      price,
      type,
      offers,
      photoUrl,
      isAvailable,
      stock,
    });

    return res.status(201).json({
      success: true,
      message: "Dish created successfully",
      data: newDish,
    });
  } catch (err) {
    console.error("Create Dish error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateDish = async (req: Request, res: Response) => {
    try {
        const { id } = req.params  
        const { name, description, price, type, offers, photoUrl, isAvailable, stock } = req.body

        
        const updateFields: Record<string, any> = {}

        if (name !== undefined) updateFields.name = name
        if (description !== undefined) updateFields.description = description
        if (price !== undefined) updateFields.price = price
        if (type !== undefined) updateFields.type = type
        if (offers !== undefined) updateFields.offers = offers
        if (photoUrl !== undefined) updateFields.photoUrl = photoUrl
        if (isAvailable !== undefined) updateFields.isAvailable = isAvailable
        if (stock !== undefined) updateFields.stock = stock

       
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, message: 'No fields provided to update' })
        }

        const updatedDish = await Dish.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        )

        if (!updatedDish) {
            return res.status(404).json({ success: false, message: 'Dish not found' })
        }

        return res.status(200).json({ success: true, dish: updatedDish })

    } catch (err) {
        console.error('Update Dish error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const deleteDish = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid dish ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid dish ID" });
        }

        const dish = await Dish.findByIdAndDelete(id)

        if (!dish) {
            return res.status(404).json({ success: false, message: "Dish not found" });
        }

        return res.status(200).json({ success: true, message: "Dish deleted" });

    } catch (err) {
        console.error('Delete Dish error:', err)
        return res.status(500).json({ success: false, message: "Failed to delete dish" });
    }
}