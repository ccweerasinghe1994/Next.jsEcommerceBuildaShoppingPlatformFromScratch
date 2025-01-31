import { z } from "zod";
import { formatNumberWithTwoDecimalPoints } from "../utils";
const currency = z
  .string()
  .refine(
    (value) =>
      /^\d+(\.\d{2})?$/.test(formatNumberWithTwoDecimalPoints(Number(value))),
    "Price must have two decimal points"
  );
// schema for updating a product
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// schema for signing in users

export const signInUserSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(6, "password must be minimum 6 characters"),
});

// schema for signing up users

export const signUpUserSchema = z
  .object({
    name: z.string().min(3, "name must be at least 3 characters"),
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(6, "password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "confirmPassword must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
