"use client";
import React, { useRef, useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Product } from "@/lib/interfaces/product";
import TodaySaleProduct from "./TodaySaleProduct";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TodaySale({ products }: { products: Product[] }) {
  const filteredProducts = products.filter(
    (product) => product.priceAfterDiscount
  );
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        
        if (hours < 0) {
          hours = 23;
          days--;
        }
        
        if (days < 0) {
          // Reset to initial values when countdown ends
          return {
            days: 3,
            hours: 23,
            minutes: 19,
            seconds: 56,
          };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-[90%] border-b border-b-gray-300 py-5">
      <div className="title w-full mb-5 py-2 px-9 before:content-[''] before:w-5 before:h-full relative before:absolute before:left-0 before:top-0 before:bg-red-600/75 before:rounded-sm text-red-600/75 font-semibold text-[13px]">
        Today&apos;s
      </div>
      <div className="subtitle flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 lg:gap-20 w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">Flash Sales</h2>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex flex-col items-center min-w-10">
              <span className="text-[10px] sm:text-xs font-medium">Days</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
            </div>
            <span className="text-lg sm:text-xl text-[#DB4444] font-bold self-end pb-1">
              :
            </span>
            <div className="flex flex-col items-center min-w-10">
              <span className="text-[10px] sm:text-xs font-medium">Hours</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            <span className="text-lg sm:text-xl text-[#DB4444] font-bold self-end pb-1">
              :
            </span>
            <div className="flex flex-col items-center min-w-10">
              <span className="text-[10px] sm:text-xs font-medium">Minutes</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            <span className="text-lg sm:text-xl text-[#DB4444] font-bold self-end pb-1">
              :
            </span>
            <div className="flex flex-col items-center min-w-10">
              <span className="text-[10px] sm:text-xs font-medium">Seconds</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex text-2xl gap-2 w-full md:w-auto justify-end">
          <BsArrowLeft
            className="text-[27px] cursor-pointer p-1 bg-gray-100 rounded-full"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <BsArrowRight
            className="text-[27px] cursor-pointer p-1 bg-gray-100 rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
      <div className="products">
        <div className="">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4 },
            }}
          >
            {filteredProducts.map((product: Product) => (
              <SwiperSlide key={product._id}>
                <TodaySaleProduct product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Button
          className="mx-auto flex mt-5 mb-10 text-gray-100 bg-red-600/75 px-10 cursor-pointer"
          size={"lg"}
          onClick={() => {
            const section = document.getElementById("all-products");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View All Products
        </Button>
      </div>
    </div>
  );
}
