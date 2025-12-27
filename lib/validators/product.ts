import { z } from "zod";

/* =========================
   CREATE PRODUCT
========================= */
export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().min(0),
  imageUrl: z.string().url().optional(),

  // ✅ NEW
  category: z.string().min(1),
});

/* =========================
   UPDATE PRODUCT (BODY.ID)
========================= */
export const productUpdateWithIdSchema = productSchema.extend({
  id: z.string().min(1),
});
