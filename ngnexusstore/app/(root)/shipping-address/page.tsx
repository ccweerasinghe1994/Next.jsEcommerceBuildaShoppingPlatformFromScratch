import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { TShippingAddress } from "@/types";
import { get } from "http";
import { getUserById } from "@/lib/actions/user.action";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Manage your shipping address here.",
};

export default async function ShippingAddress() {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }

  const user = await getUserById(userId);

  return (
    <div>
      <h1>Shipping Address</h1>
      <p>This is the shipping address page.</p>
    </div>
  );
}
