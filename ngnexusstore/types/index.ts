import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validations/validators";
import { z } from "zod";

export type TProduct = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type TCart = z.infer<typeof insertCartSchema>;

export type TCartItem = z.infer<typeof cartItemSchema>;
