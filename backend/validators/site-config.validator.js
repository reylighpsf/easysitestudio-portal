import { z } from "zod";
import { siteConfigEditableFields } from "../constants/site-config.constants.js";

const siteConfigShape = {};
for (const field of siteConfigEditableFields) {
  siteConfigShape[field] = z.string().trim().min(1, `${field} wajib diisi.`);
}

const siteConfigUpdateSchema = z
  .object(siteConfigShape)
  .partial()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "minimal satu field harus diisi.",
  });

export { siteConfigUpdateSchema };
