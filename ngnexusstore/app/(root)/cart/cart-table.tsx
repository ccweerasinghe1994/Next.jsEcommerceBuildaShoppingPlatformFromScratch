"use client";

import { useToast } from "@/hooks/use-toast";
import { TCart } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, MinusIcon, PlusIcon } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
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
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableCaption>A list of your cart items.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        className="flex items-center"
                        href={`/product/${item.slug}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() => {
                          startTransition(async () => {
                            const response = await removeItemFromCart(
                              item.productId
                            );
                            if (!response.success) {
                              toast({
                                variant: "destructive",
                                description: response.message,
                              });
                            }
                          });
                        }}
                      >
                        {isPending ? (
                          <Loader className="animate-spin w-4 h-4" />
                        ) : (
                          <MinusIcon className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="px-2">{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() => {
                          startTransition(async () => {
                            const response = await addItemToCart(item);
                            if (!response.success) {
                              toast({
                                variant: "destructive",
                                description: response.message,
                              });
                            }
                          });
                        }}
                      >
                        {isPending ? (
                          <Loader className="animate-spin w-4 h-4" />
                        ) : (
                          <PlusIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">$ {item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
