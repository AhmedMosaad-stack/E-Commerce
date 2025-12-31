"use client";
import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/interfaces/product";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function AllProducts({ products }: { products: Product[] }) {
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);
  const [visibleProducts, setvisibleProducts] = useState(8);
  const filteredProducts = products.filter(
    (product) => !product.priceAfterDiscount
  );
  return (
    <div
      id="all-products"
      className="mx-auto w-[90%] py-5"
    >
      <div className="title w-full my-5 py-2 px-9 before:content-[''] before:w-5 before:h-full relative before:absolute before:left-0 before:top-0 before:bg-red-600/75 before:rounded-sm text-red-600/75 font-semibold text-[13px]">
        Our Products
      </div>
      <div className="subtitle flex justify-between items-center">
        <h2 className="text-2xl font-semibold ">Explore Our Products</h2>
      
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-7 mt-5">
        {filteredProducts.slice(0, visibleProducts).map((product: Product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {visibleProducts === 8 ? (
        <>
          <Button
            className="mx-auto flex my-10 bg-red-600/75 px-10 cursor-pointer"
            size={"lg"}
            onClick={() => setvisibleProducts(1000)}
          >
            Show All Products
          </Button>
        </>
      ) : (
        <>
          <Button
            className="mx-auto flex my-10 bg-red-600/75 px-10 cursor-pointer"
            size={"lg"}
            onClick={() => setvisibleProducts(8)}
          >
            Show Less
          </Button>
        </>
      )}
    </div>
  );
}
