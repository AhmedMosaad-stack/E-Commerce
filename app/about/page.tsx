import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsShop, BsHandbag } from "react-icons/bs";
import { FaDollarSign, FaSackDollar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function About() {
  return (
    <div className="w-[90%] mx-auto py-10 mb-32">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-16">
        <Link href="/" className="hover:text-black">
          Home
        </Link>{" "}
        / <span className="text-black">About</span>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-32">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-8">Our Story</h1>
          <div className="space-y-4 text-base">
            <p>
              Launced in 2015, Exclusive is South Asia&apos;s premier online
              shopping makterplace with an active presense in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sallers and 300 brands and
              serves 3 millioons customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at
              a very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="/About.jpg"
            alt="Shopping"
            width={700}
            height={500}
            className="rounded-sm w-full h-auto"
          />
        </div>
      </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {/* Sellers */}
          <div className="border border-gray-300 rounded-sm p-8 flex flex-col items-center justify-center hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-gray-300 group-hover:bg-white/30 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-black group-hover:bg-white flex items-center justify-center">
                <BsShop className="text-2xl text-white group-hover:text-black" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">10.5k</h3>
            <p className="text-sm">Sallers active our site</p>
          </div>

          {/* Monthly Sale */}
          <div className="border border-gray-300 rounded-sm p-8 flex flex-col items-center justify-center hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-gray-300 group-hover:bg-white/30 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-black group-hover:bg-white flex items-center justify-center">
                <FaDollarSign className="text-2xl text-white group-hover:text-black" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">33k</h3>
            <p className="text-sm">Monthly Product Sale</p>
          </div>

          {/* Customer Active */}
          <div className="border border-gray-300 text-center rounded-sm p-8 flex flex-col items-center justify-center hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-gray-300 group-hover:bg-white/30 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-black group-hover:bg-white flex items-center justify-center">
                <BsHandbag className="text-2xl text-white group-hover:text-black" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">45.5k</h3>
            <p className="text-sm">Customer active in our site</p>
          </div>

          {/* Annual Gross Sale */}
          <div className="border border-gray-300 text-center rounded-sm p-8 flex flex-col items-center justify-center hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all group">
            <div className="w-16 h-16 rounded-full bg-gray-300 group-hover:bg-white/30 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-black group-hover:bg-white flex items-center justify-center">
                <FaSackDollar className="text-2xl text-white group-hover:text-black" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">25k</h3>
            <p className="text-sm">Anual gross sale in our site</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Tom Cruise */}
            <div>
              <div className="bg-gray-100 rounded-sm p-8 pt-10 mb-6 h-[430px] flex items-end justify-center">
                <Image
                  src="/tom.png"
                  alt="Tom Cruise"
                  width={236}
                  height={391}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">Tom Cruise</h3>
              <p className="text-sm mb-3">FOUNDER & CHAIRMAN</p>
              <div className="flex gap-3 text-base">
                <FaTwitter className="cursor-pointer hover:text-[#DB4444]" />
                <FaInstagram className="cursor-pointer hover:text-[#DB4444]" />
                <FaLinkedinIn className="cursor-pointer hover:text-[#DB4444]" />
              </div>
            </div>

            {/* Emma Watson */}
            <div>
              <div className="bg-gray-100 rounded-sm p-8 pt-10 mb-6 h-[430px] flex items-end justify-center">
                <Image
                  src="/emma.png"
                  alt="Emma Watson"
                  width={236}
                  height={391}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">Emma Watson</h3>
              <p className="text-sm mb-3">Managing Director</p>
              <div className="flex gap-3 text-base">
                <FaTwitter className="cursor-pointer hover:text-[#DB4444]" />
                <FaInstagram className="cursor-pointer hover:text-[#DB4444]" />
                <FaLinkedinIn className="cursor-pointer hover:text-[#DB4444]" />
              </div>
            </div>

            {/* Will Smith */}
            <div>
              <div className="bg-gray-100 rounded-sm p-8 pt-10 mb-6 h-[430px] flex items-end justify-center">
                <Image
                  src="/will.png"
                  alt="Will Smith"
                  width={236}
                  height={391}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">Will Smith</h3>
              <p className="text-sm mb-3">Product Designer</p>
              <div className="flex gap-3 text-base">
                <FaTwitter className="cursor-pointer hover:text-[#DB4444]" />
                <FaInstagram className="cursor-pointer hover:text-[#DB4444]" />
                <FaLinkedinIn className="cursor-pointer hover:text-[#DB4444]" />
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-[#DB4444]"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20">
          {/* Free Delivery */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                <TbTruckDelivery className="text-3xl text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm">Free delivery for all orders over $140</p>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                <RiCustomerService2Line className="text-3xl text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="text-sm">Friendly 24/7 customer support</p>
          </div>

          {/* Money Back */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                <MdOutlineVerifiedUser className="text-3xl text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-sm">We reurn money within 30 days</p>
          </div>
        </div>
    </div>
  );
}

