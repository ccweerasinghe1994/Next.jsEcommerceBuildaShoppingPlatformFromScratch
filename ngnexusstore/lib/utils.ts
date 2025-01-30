import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
