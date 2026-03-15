import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

const createSiteConfigRoutes = (siteConfigController) => {
  const router = Router();

  router.get("/site-config", asyncHandler(siteConfigController.get));

  return router;
};

export { createSiteConfigRoutes };
