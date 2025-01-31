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

// product cart schema

export const cartItemSchema = z.object({
  productId: z.string({ required_error: "product id is required" }),
  name: z.string({ required_error: "name is required" }),
  slug: z.string({ required_error: "slug is required" }),
  qty: z.number().int().nonnegative("quantity must be a positive number"),
  image: z.string({ required_error: "image is required" }),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shipping: currency,
  taxPrice: currency,
  sessionCartId: z.string({ required_error: "session cart id is required" }),
  userId: z.string().optional().nullable(),
});
