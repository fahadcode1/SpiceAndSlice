import { Request, Response } from "express";
import { Cart } from "../models/cart.Model";
export async function getCart(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ user: userId }).populate("items.dish");

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error in getCart controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { dishId, quantity = 1 } = req.body;
    if (!dishId) {
      return res.status(400).json({ success: false, message: "dishId is required" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.dish.toString() === dishId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ dish: dishId, quantity });
    }

    await cart.save();
    await cart.populate("items.dish");

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error in addToCart controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { dishId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.dish.toString() !== dishId);
    await cart.save();
    await cart.populate("items.dish");

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error in removeFromCart controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}