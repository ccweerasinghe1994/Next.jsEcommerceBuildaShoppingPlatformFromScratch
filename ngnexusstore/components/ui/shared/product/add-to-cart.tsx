"use client";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { TCart, TCartItem } from "@/types";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { PlusIcon, MinusIcon, Loader } from "lucide-react";

type Props = {
  cartItem: TCartItem;
  cart?: TCart;
};

export default function AddToCart({ cartItem, cart }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const { message, success } = await addItemToCart(cartItem);

      if (success) {
        toast({
          title: `${cartItem.name} successfully added to cart`,
          action: (
            <ToastAction
              altText="Go to cart"
              onClick={() => router.push("/cart")}
              className="hover:bg-gray-800 bg-primary dark:text-secondary dark:hover:text-primary"
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
    });
  }

  async function handleRemoveFromCart() {
    startTransition(async () => {
      const { message, success } = await removeItemFromCart(cartItem.productId);
      toast({
        variant: success ? "default" : "destructive",
        description: message,
      });

      return;
    });
  }
  const existItem =
    cart &&
    cart.items.find((product) => product.productId === cartItem.productId);

  return (
    <>
      {existItem ? (
        <div className="flex justify-center items-center">
          <Button
            type="button"
            variant={"outline"}
            onClick={handleRemoveFromCart}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <MinusIcon className="h-4 w-4" />
            )}
          </Button>
          <span className="px-2">{existItem.qty}</span>
          <Button type="button" variant={"outline"} onClick={handleAddToCart}>
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      ) : (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}{" "}
          Add to Cart
        </Button>
      )}
    </>
  );
}
