import { Router } from "express";
import { authorize } from "../utils/authorize";
import { authenticate } from "../utils/authenticate";
import { createDish } from "../controllers/dish.controller";
import { updateDish } from "../controllers/dish.controller";
import { deleteDish } from "../controllers/dish.controller";
import { getAllDishes } from "../controllers/dish.controller";


const dishRouter = Router();

dishRouter.use(authenticate)
dishRouter.get("/", authorize("dish:view", ), getAllDishes)
dishRouter.post("/", authorize("dish:create"), createDish)
dishRouter.patch("/:id", authorize("dish:update"), updateDish)
dishRouter.delete("/:id", authorize("dish:delete"), deleteDish)

export default dishRouter