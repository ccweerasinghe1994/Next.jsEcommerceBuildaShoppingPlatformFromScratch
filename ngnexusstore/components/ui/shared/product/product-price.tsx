import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  price: number;
  className?: string;
};

export default function ProductPrice({ price, className }: Props) {
  const priceWithTwoDecimalPoints = price.toFixed(2);
  const [intValue, floatValue] = priceWithTwoDecimalPoints.split(".");
  return (
    <p className={cn("font-bold text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      <span className="">{intValue}</span>
      <span className="text-xs align-super">{floatValue}</span>
    </p>
  );
}
