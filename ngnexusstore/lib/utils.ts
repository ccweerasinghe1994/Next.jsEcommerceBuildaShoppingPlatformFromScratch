import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

/**
 * A utility function to combine multiple CSS class names into a single string.
 * It uses `clsx` to conditionally apply classes and `tailwind-merge` to
 * resolve Tailwind CSS class conflicts, ensuring that the final class string
 * contains the intended styles without conflicts.
 *
 * @param {...ClassValue[]} inputs An array of class names or conditional class objects
 * that will be merged. `ClassValue` is a type from
 * the `clsx` library, allowing for strings, arrays
 * of strings, and objects where keys are class names
 * and values are boolean conditions.
 * @returns {string} A single string containing all the merged and conflict-resolved
 * CSS class names.
 *
 * @example
 * cn("bg-blue-500", "text-white"); // Returns "bg-blue-500 text-white"
 * cn("px-4", { "py-2": true, "hidden": false }); // Returns "px-4 py-2"
 * cn("font-bold", ["italic", "underline"]); // Returns "font-bold italic underline"
 * cn("m-2", "m-4"); // Returns "m-4" (tailwind-merge resolves the margin conflict)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Prisma object (which might have special internal structures)
 * into a plain JavaScript object. This is often useful for serialization
 * or when you need a simple object representation without Prisma's
 * specific properties.
 *
 * @template T The type of the input Prisma object.
 * @param {T} obj The Prisma object to convert.
 * @returns {T} A plain JavaScript object with the same data as the input.
 */
export function prismaObjectToPlainObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Formats a number to a string with exactly two decimal points.
 * If the number has fewer than two decimal points, it will be padded with zeros.
 *
 * @param {number} num The number to format.
 * @returns {string} The formatted number string with two decimal points.
 *
 * @example
 * formatNumberWithTwoDecimalPoints(10);     // Returns "10.00"
 * formatNumberWithTwoDecimalPoints(3.14);   // Returns "3.14"
 * formatNumberWithTwoDecimalPoints(5.6);    // Returns "5.60"
 * formatNumberWithTwoDecimalPoints(123.456); // Returns "123.46" (note: toFixed rounds)
 */
export function formatNumberWithTwoDecimalPoints(num: number): string {
  const twoDecimalPointNumber = num.toFixed(2);
  const [intValue, decimalValue] = twoDecimalPointNumber.split(".");

  return decimalValue
    ? `${intValue}.${decimalValue.padEnd(2, "0")}`
    : `${intValue}.00`;
}

/**
 * Formats different types of errors into user-friendly messages.
 * Handles Zod validation errors and Prisma Client known request errors (specifically P2002 for unique constraint violations).
 * For other errors, it returns the error message as a string or its JSON string representation if it's an object.
 *
 * @param {any} error The error object to format. Can be an instance of ZodError, a Prisma Client known request error, or any other error type.
 * @returns {string} A formatted error message string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error instanceof ZodError) {
    const message: string = error.errors
      .map((error) => error.message)
      .join(" .");
    return message;
  }

  if (error.name === "PrismaClientKnownRequestError" && error.code == "P2002") {
    const field: string = error.meta?.target ? error.meta?.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

/**
 * Rounds a number or a string representation of a number to two decimal places.
 *
 * @param {number | string} value The number or string to round.
 * @returns {number} The rounded number.
 * @throws {Error} If the input `value` is neither a number nor a string.
 */
export function round2(value: number | string): number {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("value is not a number or string");
  }
}
