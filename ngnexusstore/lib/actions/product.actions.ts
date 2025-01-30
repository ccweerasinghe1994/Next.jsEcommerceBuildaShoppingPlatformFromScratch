"use server";

import { prismaObjectToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../contants";
import { prisma } from "@/db/prisma";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return prismaObjectToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: {
      slug,
    },
  });
}
