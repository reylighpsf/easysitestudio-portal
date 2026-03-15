import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import { contactCreateSchema } from "../validators/contact.validator.js";

const createContactRoutes = (contactController) => {
  const router = Router();

  router.post("/contact", validate(contactCreateSchema), asyncHandler(contactController.create));

  return router;
};

export { createContactRoutes };
