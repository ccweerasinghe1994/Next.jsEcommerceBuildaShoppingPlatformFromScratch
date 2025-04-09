"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};

export default function ProductImages({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[currentIndex]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              {
                "border-orange-500": currentIndex === index,
                "border-gray-200": currentIndex !== index,
              }
            )}
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            <Image src={image} alt="product image" width={100} height={100} priority={true}/>
          </div>
        ))}
      </div>
    </div>
  );
}
