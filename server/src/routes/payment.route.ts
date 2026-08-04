import { Router } from "express";
import { authenticate } from "../utils/authenticate";
import { createCheckoutSession } from "../controllers/payment.controller";

const paymentRoutes = Router();
paymentRoutes.post("/create-checkout-session", authenticate, createCheckoutSession);

export default paymentRoutes;