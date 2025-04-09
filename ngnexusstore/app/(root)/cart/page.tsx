import { Metadata } from "next";
import React from "react";
import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.action";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default async function Cart() {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
}
