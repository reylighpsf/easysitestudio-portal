import { z } from "zod";

export { siteConfigUpdateSchema } from "./site-config.validator.js";
export { contactListQuerySchema } from "./contact.validator.js";
export {
  portfolioProductCreateSchema,
  portfolioProductParamSchema,
  portfolioProductUpdateSchema,
} from "./portfolio-product.validator.js";
export {
  pricePlanCreateSchema,
  pricePlanParamSchema,
  pricePlanUpdateSchema,
} from "./price-plan.validator.js";

export const adminLoginSchema = z.object({
  id: z.string().trim().min(1, "id wajib diisi."),
  password: z.string().min(1, "password wajib diisi."),
});
