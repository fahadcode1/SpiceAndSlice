import { Router } from "express";
import { authorize } from "../utils/authorize";
import { authenticate } from "../utils/authenticate";
import { handlepromoteAdmin } from "../controllers/staff.controller";
import { handleDemoteAdmin } from "../controllers/staff.controller";
import { handlepromoteManager } from "../controllers/staff.controller";
import { handleDemoteManager } from "../controllers/staff.controller";
import { getAllStaff } from "../controllers/staff.controller";
import { getAllOrders } from "../controllers/staff.controller";
import { updateOrderStatus } from "../controllers/staff.controller";
import { handleStaffLogin } from "../controllers/staff.controller";


const staffRoutes = Router()
staffRoutes.post("/login", handleStaffLogin);
staffRoutes.use(authenticate)

staffRoutes.get("/", authorize("user:get_staffs"), getAllStaff)
staffRoutes.patch("/promote-admin", authorize("user:promote_admin"), handlepromoteAdmin)
staffRoutes.patch("/demote-admin", authorize("user:demote_admin"), handleDemoteAdmin)
staffRoutes.patch("/promote-manager", authorize("user:promote_manager"), handlepromoteManager)
staffRoutes.patch("/demote-manager", authorize("user:demote_manager"), handleDemoteManager )
staffRoutes.get("/orders", authenticate, authorize("order:view_all"), getAllOrders)
staffRoutes.patch("/orders/:orderId/status", authenticate, authorize("order:approve"), updateOrderStatus)

export default staffRoutes