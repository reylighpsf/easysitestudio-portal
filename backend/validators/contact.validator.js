import { z } from "zod";

const contactCreateSchema = z.object({
  name: z.string().trim().min(1, "name wajib diisi."),
  email: z.string().trim().email("email tidak valid."),
  message: z.string().trim().min(1, "message wajib diisi."),
});

const contactListQuerySchema = z.object({
  limit: z.string().optional(),
});

export { contactCreateSchema, contactListQuerySchema };
