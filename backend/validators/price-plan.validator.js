import { z } from "zod";

const booleanInputSchema = z.preprocess((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }

  return value;
}, z.boolean());

const pricePlanCreateSchema = z.object({
  name: z.string().trim().min(1, "name wajib diisi.").max(120, "name maksimal 120 karakter."),
  price: z.coerce.number().int().min(0, "price minimal 0.").max(999999999, "price terlalu besar."),
  features: z.string().trim().min(1, "features wajib diisi.").max(4000, "features maksimal 4000 karakter."),
  isHighlighted: booleanInputSchema.default(false),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  isActive: booleanInputSchema.default(true),
});

const pricePlanUpdateSchema = z
  .object({
    name: z.string().trim().min(1, "name wajib diisi.").max(120, "name maksimal 120 karakter.").optional(),
    price: z.coerce.number().int().min(0, "price minimal 0.").max(999999999, "price terlalu besar.").optional(),
    features: z.string().trim().min(1, "features wajib diisi.").max(4000, "features maksimal 4000 karakter.").optional(),
    isHighlighted: booleanInputSchema.optional(),
    sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
    isActive: booleanInputSchema.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "minimal satu field harus diisi.",
  });

const pricePlanParamSchema = z.object({
  id: z.coerce.number().int().positive("id paket harga tidak valid."),
});

export {
  pricePlanCreateSchema,
  pricePlanUpdateSchema,
  pricePlanParamSchema,
};
