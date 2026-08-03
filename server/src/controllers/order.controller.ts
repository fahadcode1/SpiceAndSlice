import { Request, Response } from "express";
import { Order } from "../models/order.Model";
import { Dish } from "../models/dishModel";

export async function createOrder(req: Request, res: Response) {
  try {
    const userId = (req.user as { userId: string })?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "No order items" });
    }

    for (const item of orderItems) {
      const dish = await Dish.findById(item.dish);
      if (!dish) {
        return res.status(404).json({ success: false, message: `Dish ${item.name} not found` });
      }
      if (dish.stock !== undefined && dish.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${dish.name}` });
      }
    }

    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentResult: {
        method: paymentMethod || "COD",
      },
      totalPrice,
    });

    for (const item of orderItems) {
      await Dish.findByIdAndUpdate(item.dish, {
        $inc: { stock: -item.quantity },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error in createOrder controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getUserOrders(req: Request, res: Response) {
  try {
    const userId = (req.user as { userId: string })?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orders = await Order.find({ user: userId })
      .populate("orderItems.dish")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in getUserOrders controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function cancelOrder(req: Request, res: Response) {
  try {
    const userId = (req.user as { userId: string })?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order once it is ${order.status}`,
      });
    }

    // restore dish stock
    for (const item of order.orderItems) {
      await Dish.findByIdAndUpdate(item.dish, {
        $inc: { stock: item.quantity },
      });
    }

    order.status = "cancelled" as any;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error in cancelOrder controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}