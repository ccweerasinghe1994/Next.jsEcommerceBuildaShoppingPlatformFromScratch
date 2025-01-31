import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// this is to convert prisma object to plain object

export function prismaObjectToPlainObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// format numbers with two decimal points

export function formatNumberWithTwoDecimalPoints(num: number): string {
  const twoDecimalPointNumber = num.toFixed(2);
  const [intValue, decimalValue] = twoDecimalPointNumber.split(".");

  return decimalValue
    ? `${intValue}.${decimalValue.padEnd(2, "0")}`
    : `${intValue}.00`;
}

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
