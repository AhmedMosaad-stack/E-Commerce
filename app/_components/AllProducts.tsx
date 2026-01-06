"use client";
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/interfaces/product";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function AllProducts({ products }: { products: Product[] }) {
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);
  const [initialCount, setInitialCount] = useState(6);
  const [visibleProducts, setvisibleProducts] = useState(6);
  
  useEffect(() => {
    const updateInitialCount = () => {
      const width = window.innerWidth;
      let count = 6;
      
      if (width < 640) {
        count = 1; // 1 column x 1 row
      } else if (width < 768) {
        count = 2; // 2 columns x 1 row
      } else if (width < 1024) {
        count = 3; // 3 columns x 1 row
      } else if (width < 1280) {
        count = 4; // 4 columns x 1 row
      } else if (width < 1536) {
        count = 5; // 5 columns x 1 row
      } else {
        count = 6; // 6 columns x 1 row
      }
      
      setInitialCount(count);
      if (visibleProducts === initialCount) {
        setvisibleProducts(count);
      }
    };
    
    updateInitialCount();
    window.addEventListener('resize', updateInitialCount);
    return () => window.removeEventListener('resize', updateInitialCount);
  }, []);
  
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7 mt-5 transition-all duration-500">
        {filteredProducts.slice(0, visibleProducts).map((product: Product, index) => (
          <div 
            key={product._id}
            className={`${index < initialCount ? '' : 'opacity-0 animate-slideUpFade'}`}
            style={index >= initialCount ? { 
              animationDelay: `${(index - initialCount) * 30}ms`,
              animationFillMode: 'forwards'
            } : {}}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="transition-all duration-500">
      {visibleProducts === initialCount ? (
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
            onClick={() => setvisibleProducts(initialCount)}
          >
            Show Less
          </Button>
        </>
      )}
      </div>
    </div>
  );
}
