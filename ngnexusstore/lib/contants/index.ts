import { TShippingAddress } from "@/types";

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "CGNEXUS E-COMMERCE";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "a modern e-commerce store built with Next.js";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCT_LIMIT) || 4;

export const signInDefaultValues = {
  email: "ccweerasinghe1994@gmail.com",
  password: "Sliit123",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues: TShippingAddress = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};
