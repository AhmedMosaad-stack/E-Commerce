"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import CategoryCard from "./CategoryCard";
import { Category } from "@/lib/interfaces/category";
export default function Categories({ categories }: { categories: Category[] }) {
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);

  return (
    <div className="mx-auto w-[90%] border-b border-gray-300 py-5">
      <div className="title w-full my-5 py-2 px-9 before:content-[''] before:w-5 before:h-full relative before:absolute before:left-0 before:top-0 before:bg-red-600/75 before:rounded-sm text-red-600/75 font-semibold text-[13px]">
        Categories
      </div>
      <div className="subtitle flex justify-between items-center">
        <h2 className="text-2xl font-semibold ">Browse By Category</h2>
        <p className="flex text-2xl gap-2">
          <BsArrowLeft
            className="text-[27px] cursor-pointer p-1 bg-gray-100 rounded-full"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <BsArrowRight
            className="text-[27px] cursor-pointer p-1 bg-gray-100 rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </p>
      </div>
      <div className="products my-5">
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        >
          {categories?.map((category: Category) => (
            <SwiperSlide key={category._id} className="">
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
