import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import {
  attachPortfolioImageField,
  uploadPortfolioImage,
} from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  adminLoginSchema,
  contactListQuerySchema,
  portfolioProductCreateSchema,
  portfolioProductParamSchema,
  portfolioProductUpdateSchema,
  pricePlanCreateSchema,
  pricePlanParamSchema,
  pricePlanUpdateSchema,
} from "../validators/admin.validator.js";

const createAdminRoutes = (adminController) => {
  const router = Router();

  router.post("/login", validate(adminLoginSchema), asyncHandler(adminController.login));

  router.use(requireAdmin);

  router.get(
    "/contacts",
    validate(contactListQuerySchema, "query"),
    asyncHandler(adminController.listContacts),
  );
  router.get("/portfolio-products", asyncHandler(adminController.listPortfolioProducts));
  router.post(
    "/portfolio-products",
    uploadPortfolioImage,
    attachPortfolioImageField,
    validate(portfolioProductCreateSchema),
    asyncHandler(adminController.createPortfolioProduct),
  );
  router.put(
    "/portfolio-products/:id",
    validate(portfolioProductParamSchema, "params"),
    uploadPortfolioImage,
    attachPortfolioImageField,
    validate(portfolioProductUpdateSchema),
    asyncHandler(adminController.updatePortfolioProduct),
  );
  router.delete(
    "/portfolio-products/:id",
    validate(portfolioProductParamSchema, "params"),
    asyncHandler(adminController.deletePortfolioProduct),
  );

  router.get("/price-plans", asyncHandler(adminController.listPricePlans));
  router.post(
    "/price-plans",
    validate(pricePlanCreateSchema),
    asyncHandler(adminController.createPricePlan),
  );
  router.put(
    "/price-plans/:id",
    validate(pricePlanParamSchema, "params"),
    validate(pricePlanUpdateSchema),
    asyncHandler(adminController.updatePricePlan),
  );
  router.delete(
    "/price-plans/:id",
    validate(pricePlanParamSchema, "params"),
    asyncHandler(adminController.deletePricePlan),
  );

  return router;
};

export { createAdminRoutes };
