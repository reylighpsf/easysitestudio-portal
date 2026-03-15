import { z } from "zod";

const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "format warna hex tidak valid.");

const projectUrlSchema = z
  .string()
  .trim()
  .max(512, "projectUrl maksimal 512 karakter.")
  .url("projectUrl tidak valid.")
  .or(z.literal(""));

const imageUrlValueSchema = z.string().trim().max(1024, "imageUrl maksimal 1024 karakter.");
const imageUrlSchema = imageUrlValueSchema.refine(
  (value) =>
    value === "" ||
    /^https?:\/\/.+/i.test(value) ||
    /^\/uploads\/portfolio\/[A-Za-z0-9._-]+$/.test(value),
  "imageUrl tidak valid.",
);
const galleryImagesSchema = z
  .preprocess((value) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim().length > 0) {
      return [value];
    }
    return value;
  }, z.array(imageUrlSchema).max(4, "maksimal 4 gambar per produk."))
  .optional();

const defaultGradientFrom = "#1d4ed8";
const defaultGradientTo = "#06b6d4";
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

const portfolioProductCreateSchema = z.object({
  title: z.string().trim().min(1, "title wajib diisi.").max(160, "title maksimal 160 karakter."),
  category: z
    .string()
    .trim()
    .min(1, "category wajib diisi.")
    .max(80, "category maksimal 80 karakter."),
  price: z.coerce.number().int().min(0, "price minimal 0.").max(999999999, "price terlalu besar."),
  gradientFrom: hexColorSchema.optional().default(defaultGradientFrom),
  gradientTo: hexColorSchema.optional().default(defaultGradientTo),
  imageUrl: imageUrlSchema.refine((value) => value.trim().length > 0, "gambar wajib diupload."),
  galleryImages: galleryImagesSchema,
  projectUrl: projectUrlSchema.optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  isActive: booleanInputSchema.default(true),
});

const portfolioProductUpdateSchema = z
  .object({
    title: z.string().trim().min(1, "title wajib diisi.").max(160, "title maksimal 160 karakter.").optional(),
    category: z
      .string()
      .trim()
      .min(1, "category wajib diisi.")
      .max(80, "category maksimal 80 karakter.")
      .optional(),
    price: z.coerce.number().int().min(0, "price minimal 0.").max(999999999, "price terlalu besar.").optional(),
    gradientFrom: hexColorSchema.optional(),
    gradientTo: hexColorSchema.optional(),
    imageUrl: imageUrlSchema.optional(),
    galleryImages: galleryImagesSchema,
    projectUrl: projectUrlSchema.optional(),
    sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
    isActive: booleanInputSchema.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "minimal satu field harus diisi.",
  });

const portfolioProductParamSchema = z.object({
  id: z.coerce.number().int().positive("id produk tidak valid."),
});

export {
  portfolioProductCreateSchema,
  portfolioProductUpdateSchema,
  portfolioProductParamSchema,
};
