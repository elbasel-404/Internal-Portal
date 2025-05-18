import { z } from 'zod';

export const ProductSchema = z.object({
  product: z.string(),
  description: z.string(),
  quantity: z.string(),
  unitPrice: z.union([z.string(), z.number()]),
  tax: z.string(),
});
