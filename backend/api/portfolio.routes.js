import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

const createPortfolioRoutes = (portfolioProductController) => {
  const router = Router();

  router.get("/portfolio-products", asyncHandler(portfolioProductController.list));

  return router;
};

export { createPortfolioRoutes };
