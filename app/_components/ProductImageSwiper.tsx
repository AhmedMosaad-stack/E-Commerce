"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

export default function ProductImageSwiper({
  images,
  imageCover,
  slug,
}: {
  images: string[];
  imageCover: string;
  slug: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const allImages = [imageCover, ...images];

  return (
    <>
      {/* Main Swiper - Desktop */}
      <div className="hidden md:grid grid-cols-12 gap-6">
        <div className="col-span-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <Image
                  src={image}
                  alt={`${slug}-${index}`}
                  height={500}
                  width={500}
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-10">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  height={600}
                  width={600}
                  alt={`${slug}-${index}`}
                  className="object-cover w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="product-mobile-swiper"
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                height={400}
                width={400}
                alt={`${slug}-${index}`}
                className="object-cover w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
