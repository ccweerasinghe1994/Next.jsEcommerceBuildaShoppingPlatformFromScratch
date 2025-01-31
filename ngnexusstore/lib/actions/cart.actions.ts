"use server";

import { TCartItem } from "@/types";

type TResponse = {
  success: boolean;
  message: string;
};

export async function addItemToCart(cartitem: TCartItem): Promise<TResponse> {
  console.log(cartitem);

  return {
    message: "user added successfully",
    success: true,
  };
}
