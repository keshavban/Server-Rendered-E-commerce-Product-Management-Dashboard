import { z } from "zod";

export const sellSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});
