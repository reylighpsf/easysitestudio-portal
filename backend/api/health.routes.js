import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

const createHealthRoutes = (healthController) => {
  const router = Router();

  router.get("/health", asyncHandler(healthController.check));

  return router;
};

export { createHealthRoutes };
