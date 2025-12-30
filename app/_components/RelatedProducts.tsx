"use client";
import { Product } from "@/lib/interfaces/product";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import TodaySaleProduct from "./TodaySale/TodaySaleProduct";
import { Button } from "@/components/ui/button";

export default function RelatedProducts({
  products,
  categoryName,
  currentProductId,
}: {
  products: Product[];
  categoryName: { _id: string; name: string; slug: string };
  currentProductId: string;
}) {
  const filteredProducts = products.filter(
    (product) =>
      product.category.name === categoryName.name && product._id !== currentProductId
  );
  const [visibleProducts, setvisibleProducts] = useState(4);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-7 mt-5">
        {filteredProducts.slice(0, visibleProducts).map((product: Product) => (
          <div key={product._id}>
            {product.priceAfterDiscount ? (
              <TodaySaleProduct product={product} /> // فيه خصم
            ) : (
              <ProductCard product={product} /> // مفيش خصم
            )}
          </div>
        ))}
      </div>
      {visibleProducts === 4 ? (
        <>
          <Button
            className="mx-auto flex my-10 bg-red-600/75 px-10 cursor-pointer"
            size={"lg"}
            onClick={() => setvisibleProducts(1000)}
          >
            Show All Related Products
          </Button>
        </>
      ) : (
        <>
          <Button
            className="mx-auto flex my-10 bg-red-600/75 px-10 cursor-pointer"
            size={"lg"}
            onClick={() => setvisibleProducts(4)}
          >
            Show Less
          </Button>
        </>
      )}
    </>
  );
}
