import { Product } from "@/lib/interfaces/product";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { PiEyeThin } from "react-icons/pi";
import Link from "next/link";
import AddCartButton from "./AddCartButton";
import { useSession } from "next-auth/react";
export default function ProductCard({ product }: { product: Product }) {
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
          <div className="icons absolute right-2 top-0 flex flex-col gap-2">
            <CiHeart className="text-[33px] p-1 bg-gray-100 rounded-full cursor-pointer" />
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
        {
          <p className="text-red-600 text-[14px] font-semibold">
            ${product.price}
          </p>
        }
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
