import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { Order } from "../models/order.Model";

// Stripe webhook — marks the order as paid when the payment is completed.
// IMPORTANT: This does NOT advance the order status.
// It only updates paymentResult.status.

// Payment verification is handled manually by the staff
// through the StaffOrdersPage.

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate("orderItems.dish");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: order.orderItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.CLIENT_URL}/account/my-orders?payment=success&orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cart?payment=cancelled`,
      metadata: { orderId: order._id.toString() },
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return res.status(500).json({ success: false, message: "Payment initialization failed" });
  }
}


export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        "paymentResult.method": "STRIPE",
        "paymentResult.id": session.payment_intent,
        "paymentResult.status": "paid",
      });
    }
  }

  return res.status(200).json({ received: true });
}


export async function verifyPayment(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const staffId = (req as any).user?._id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.paymentResult.status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not received yet" });
    }

    order.paymentResult.status = "verified";
    order.paymentResult.verifiedBy = staffId;
    order.paymentResult.verifiedAt = new Date();
    await order.save();

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}