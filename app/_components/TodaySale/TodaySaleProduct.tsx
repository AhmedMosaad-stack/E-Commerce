import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { PiEyeThin } from "react-icons/pi";
import AddCartButton from "../AddCartButton";
import { useSession } from "next-auth/react";

export default function TodaySaleProduct({ product }: { product: Product }) {
  const { data: session } = useSession();
  return (
    <Card className="border-0 shadow rounded-2xl gap-2 group">
      <CardHeader className="p-0">
        <CardTitle className="relative overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.slug}
            width={500}
            height={500}
            className="object-contain size-[200px] mx-auto"
          />
          {product.priceAfterDiscount && (
            <div className="sale px-3 py-[3px] text-[13px] text-gray-200 rounded bg-red-500 absolute left-2 top-0">
              -
              {Math.floor(
                100 - (product.priceAfterDiscount * 100) / product.price
              )}
              %
            </div>
          )}
          <div className="icons absolute right-2 top-0 flex flex-col gap-2">
            <Link href={`/product/${product._id}`}>
              <PiEyeThin className="text-[33px] p-1 bg-gray-100 rounded-full cursor-pointer" />
            </Link>
          </div>
          {session?.user && (
            <div className="layer bg-gray-950 p-1 text-white text-center rounded-b-sm absolute left-0 right-0 bottom-0 md:-bottom-[50%] md:group-hover:bottom-0 duration-200 cursor-pointer">
              <AddCartButton id={product._id} />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm line-clamp-1 font-semibold">
        {product.title}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <p className="text-red-600 font-semibold text-[14px]">
            ${product.priceAfterDiscount}
          </p>
          <p className="text-gray-500 font-semibold text-[12px] line-through">
            ${product.price}
          </p>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(product.ratingsAverage)
                  ? "opacity-100"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <p className="ml-1 text-sm text-gray-500 font-semibold">
          ({product.ratingsQuantity}){" "}
        </p>
      </CardFooter>
    </Card>
  );
}
