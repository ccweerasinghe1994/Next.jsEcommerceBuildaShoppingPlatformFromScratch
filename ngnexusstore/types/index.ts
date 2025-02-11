import { insertProductSchema } from "@/lib/validations/validators";
import { z } from "zod";

export type TProduct = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
