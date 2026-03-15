import { Router } from "express";
import { createAdminRoutes } from "./admin.routes.js";
import { createContactRoutes } from "./contact.routes.js";
import { createHealthRoutes } from "./health.routes.js";
import { createPortfolioRoutes } from "./portfolio.routes.js";
import { createPricePlanRoutes } from "./price-plan.routes.js";
import { createSiteConfigRoutes } from "./site-config.routes.js";

const createApiRoutes = ({
  healthController,
  siteConfigController,
  portfolioProductController,
  pricePlanController,
  contactController,
  adminController,
}) => {
  const router = Router();

  router.use(createHealthRoutes(healthController));
  router.use(createSiteConfigRoutes(siteConfigController));
  router.use(createPortfolioRoutes(portfolioProductController));
  router.use(createPricePlanRoutes(pricePlanController));
  router.use(createContactRoutes(contactController));
  router.use("/admin", createAdminRoutes(adminController));

  return router;
};

export { createApiRoutes };
