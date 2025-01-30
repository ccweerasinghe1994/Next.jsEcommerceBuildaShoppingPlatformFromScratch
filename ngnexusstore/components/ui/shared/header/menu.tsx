import React from "react";
import Toggle from "./toogle";
import { Ellipsis, ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <Toggle />
        <Button asChild variant={"ghost"}>
          <Link href={"/cart"}>
            <ShoppingCart /> cart
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/cart"}>
            <UserIcon /> sign-in
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Ellipsis />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <Toggle />
              <Button asChild variant={"ghost"}>
                <Link href={"/cart"}>
                  <ShoppingCart /> cart
                </Link>
              </Button>
              <Button asChild>
                <Link href={"/cart"}>
                  <UserIcon /> sign-in
                </Link>
              </Button>

              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
