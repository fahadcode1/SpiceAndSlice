import { authenticate } from "../utils/authenticate";
import { authorize } from "../utils/authorize";
import { Router } from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/staff.controller";
import { verifyPayment } from "../controllers/payment.controller";

const orderRoutes = Router();
orderRoutes.use(authenticate);

orderRoutes.get("/", authorize("order:view_all"), getAllOrders);
orderRoutes.patch("/:orderId/status", authorize("order:approve"), updateOrderStatus);
orderRoutes.patch("/:orderId/verify-payment", authorize("order:approve"), verifyPayment);

export default orderRoutes;