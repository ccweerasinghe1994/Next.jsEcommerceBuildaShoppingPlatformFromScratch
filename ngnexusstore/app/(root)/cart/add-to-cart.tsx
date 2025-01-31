"use client";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { TCartItem } from "@/types";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
type Props = {
  cartItem: TCartItem;
};

export default function AddToCart({ cartItem }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleAddToCart() {
    const { message, success } = await addItemToCart(cartItem);

    if (success) {
      toast({
        title: `${cartItem.name} successfully added to cart`,
        action: (
          <ToastAction
            altText="Go to cart"
            onClick={() => router.push("/cart")}
            className="hover:bg-gray-800 text-white bg-primary"
          >
            Go To Cart
          </ToastAction>
        ),
      });
      return;
    }

    if (!success) {
      toast({
        description: message,
        variant: "destructive",
      });
      return;
    }
  }

  return (
    <>
      <Button className="w-full" type="button" onClick={handleAddToCart}>
        <PlusIcon /> Add to Cart
      </Button>
    </>
  );
}
