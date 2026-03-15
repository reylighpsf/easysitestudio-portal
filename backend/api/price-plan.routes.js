import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

const createPricePlanRoutes = (pricePlanController) => {
  const router = Router();

  router.get("/price-plans", asyncHandler(pricePlanController.list));

  return router;
};

export { createPricePlanRoutes };
