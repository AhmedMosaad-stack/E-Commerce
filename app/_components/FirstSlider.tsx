"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import iphoneSlider from "@/public/IphoneSlider.jpg";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
export default function FirstSlider() {
  return (
    <div className="flex items-center mx-auto w-[90%] mb-20">
      <div className="w-1/4 border-r border-gray-300 p-3 hidden md:block">
        <ul className="text-[14px] flex flex-col gap-3">
          <li>Woman&apos;s Fashion</li>
          <li>Men&apos;s Fashion</li>
          <li>Electronics</li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Baby&apos;s & Toys</li>
          <li>Groceries & Pets</li>
          <li>Health & Beauty</li>
        </ul>
      </div>
      <div className="w-full md:w-3/4 text-white p-8">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          className="text-center bg-black"
        >
          <SwiperSlide>
            <div className="flex items-center">
              <div className="w-1/2 text-left p-10">
                <h2 className="flex gap-2 items-center text-[12px]">
                  <FaApple className="text-4xl" />
                  iPhone 14 Series
                </h2>
                <p className="text-5xl my-3">
                  Up to 10% <br /> off Voucher{" "}
                </p>
                <Link href={"/"} className="underlined flex gap-2 items-center">
                  <span className="border-b">Shop Now</span>
                  <BsArrowRight className="text-xl" />
                </Link>
              </div>
              <div className="image-holder w-1/2 object-contain size-50 overflow-hidden">
                <Image src={iphoneSlider} alt="iphone-14" className="w-full" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
