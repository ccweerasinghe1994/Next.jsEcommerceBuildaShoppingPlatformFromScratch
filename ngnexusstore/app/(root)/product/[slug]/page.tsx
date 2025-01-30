import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductImages from "@/components/ui/shared/product/product-images";
import ProductPrice from "@/components/ui/shared/product/product-price";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images column */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          {/* Details column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p className="">
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <ProductPrice
                  price={Number(product.price)}
                  className="bg-green-100 text-green-700 w-24 rounded-full px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <p>Price</p>
                  <ProductPrice price={Number(product.price)} />
                </div>
                <div className="mb-2 flex justify-between">
                  <p>Stock</p>
                  {product.stock ? (
                    <Badge variant={"outline"}>In Stock</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Out Of In Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <Button className="w-full">Add To Cart</Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
