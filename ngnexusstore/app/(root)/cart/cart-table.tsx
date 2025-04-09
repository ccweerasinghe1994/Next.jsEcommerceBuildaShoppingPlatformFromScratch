"use client";

import { useToast } from "@/hooks/use-toast";
import { TCart } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type CartTableProps = {
  cart?: TCart;
};

export default function CartTable({ cart }: CartTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h2 className="py-4 h2-bold">Shopping Cart</h2>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is Empty <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">Table</div>
        </div>
      )}
    </>
  );
}
