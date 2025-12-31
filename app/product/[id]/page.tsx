import { ProductDetails, Product } from "@/lib/interfaces/product";
import Image from "next/image";
import type { ReactNode } from "react";
import Counter from "../../_components/Counter";
import { TbTruckDelivery } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { getAllProducts } from "@/lib/services/getAllProducts";
import RelatedProducts from "../../_components/RelatedProducts";
import ProductImageSwiper from "../../_components/ProductImageSwiper";
import "../product.css";
import { getMytoken } from "@/utilities/getMytoken";

export interface Params {
  id: string;
}


export default async function Details({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { id } = await params;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const { data }: { data: ProductDetails } = await res.json();
  
  const sizes: string[] = ["XS", "S", "M", "L", "XL"];
  const products: Product[] = await getAllProducts();
const token = await getMytoken()
console.log(token);

  return (
    <div className=" mx-auto w-[90%] p-10">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-6">
        <div className="col-span-2">
          {data.images?.[0] && (
            <Image
              src={data.images?.[0] as string}
              alt={data.slug}
              height={500}
              width={500}
            />
          )}
          {data.images?.[1] && (
            <Image
              src={data.images?.[1] as string}
              alt={data.slug}
              height={500}
              width={500}
              className="my-3"
            />
          )}
          {data.images?.[2] && (
            <Image
              src={data.images?.[2] as string}
              alt={data.slug}
              height={500}
              width={500}
            />
          )}
          {data.images?.[3] && (
            <Image
              src={data.images?.[3] as string}
              alt={data.slug}
              height={500}
              width={500}
              className="mt-3"
            />
          )}
        </div>
        <div className="col-span-5">
          <Image
            src={data.imageCover}
            height={500}
            width={500}
            alt={data.slug}
            className=""
          />
        </div>
        <div className="col-span-5 flex flex-col justify-around">
          <div className="info border-b pb-5">
            <h1 className="font-bold text-2xl">{data.title}</h1>
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400 my-3">
                {[...Array(5)].map((_, i: number) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(data.ratingsAverage)
                        ? "opacity-100"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                ({data.ratingsQuantity} Reviews){" "}
              </p>
            </div>
            {data.priceAfterDiscount ? (
              <p className="text-xl mb-5">${data.priceAfterDiscount}.00 <span className="text-lg text-gray-500 mb-5 line-through">${data.price}.00</span></p>
            ) : (
              <p className="text-xl mb-5">${data.price}.00</p>
            )}
            <p className="text-[14px]">{data.description}</p>
          </div>
          <div className="customize">
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xl">Size:</p>
              <div className="flex gap-3">
                {sizes.map((size: string) => (
                  <label key={size}>
                    <input type="radio" name="size" className="hidden peer" />
                    <div className="border border-gray-400 rounded-sm p-1 flex items-center justify-center size-7 text-sm font-semibold cursor-pointer peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500">
                      {size}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Counter id={data.id} />
            </div>
          </div>
          <div>
            <div className="border border-gray-400 rounded-t-sm p-5 flex items-center gap-3">
              <TbTruckDelivery className="text-4xl" />
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-[14px] underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="border border-t-0 rounded-b-sm border-gray-400 p-5 flex items-center gap-3">
              <TbTruckDelivery className="text-4xl" />
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <p className="text-[14px]">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout with Swiper */}
      <div className="md:hidden">
        <ProductImageSwiper
          images={data.images}
          imageCover={data.imageCover}
          slug={data.slug}
        />
        <div className="mt-6">
          <div className="info border-b pb-5">
            <h1 className="font-bold text-2xl">{data.title}</h1>
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400 my-3">
                {[...Array(5)].map((_, i: number) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(data.ratingsAverage)
                        ? "opacity-100"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                ({data.ratingsQuantity} Reviews){" "}
              </p>
            </div>
            {data.priceAfterDiscount ? (
              <p className="text-xl mb-5">${data.priceAfterDiscount}.00 <span className="text-lg text-gray-500 mb-5 line-through">${data.price}.00</span></p>
            ) : (
              <p className="text-xl mb-5">${data.price}.00</p>
            )}
            <p className="text-[14px]">{data.description}</p>
          </div>
          <div className="customize">
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xl">Size:</p>
              <div className="flex gap-3">
                {sizes.map((size: string) => (
                  <label key={size}>
                    <input type="radio" name="size" className="hidden peer" />
                    <div className="border border-gray-400 rounded-sm p-1 flex items-center justify-center size-7 text-sm font-semibold cursor-pointer peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500">
                      {size}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Counter id={data.id} />
            </div>
          </div>
          <div>
            <div className="border border-gray-400 rounded-t-sm p-5 flex items-center gap-3">
              <TbTruckDelivery className="text-4xl" />
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-[14px] underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="border border-t-0 rounded-b-sm border-gray-400 p-5 flex items-center gap-3">
              <TbTruckDelivery className="text-4xl" />
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <p className="text-[14px]">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="title w-full mt-20 py-2 px-9 before:content-[''] before:w-5 before:h-full relative before:absolute before:left-0 before:top-0 before:bg-red-600 before:rounded-sm text-red-600 font-semibold text-[13px]">
        Related Item
      </div>
      <RelatedProducts products={products} categoryName={data.category} currentProductId={data._id} />
    </div>
  );
}
