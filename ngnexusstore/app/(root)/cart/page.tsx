import { Metadata } from "next";
import React from "react";
import CartTable from "./cart-table";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function Cart() {
  return (
    <>
      <CartTable />
    </>
  );
}
