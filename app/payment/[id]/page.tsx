"use client";

import React, { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Field, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  cashPaymentSchema,
  cashPaymentSchemaType,
} from "@/schema/cashPayment.schema";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import cashPayment from "@/lib/services/cashPayment";
import bankPayment from "@/lib/services/bankPayment";
import { getUserCart } from "@/lib/services/getUserCart";
import { CartProduct } from "@/lib/interfaces/cart";
import Loader from "@/app/_components/Loader";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import { CartContext } from "@/context/CartContext";

export default function Payment() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank">("bank");
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
const {setcartNumber} = useContext(CartContext)!
  const router = useRouter();

  const form = useForm<cashPaymentSchemaType>({
    defaultValues: {
      details: "details",
      phone: "",
      city: "",
    },
    mode: "onBlur",
    resolver: zodResolver(cashPaymentSchema),
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getUserCart();
        if (res.status === "success") {
          setProducts(res.data.products);
          setCartTotal(res.data.totalCartPrice);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCart();
  }, []);

  async function handlePayment(values: cashPaymentSchemaType) {
    setIsSubmitting(true);
    try {
      if (paymentMethod === "cash") {
        const result = await cashPayment(id as string, values);
        if (result.status === "success") {
          setcartNumber(0);
          toast.success("Order placed successfully!", {
            position: "top-center",
            duration: 3000,
            style: { backgroundColor: "#ffffff", color: "green" },
          });
          router.push("/allorders");
        } else {
          toast.error(result.message || "Payment failed!", {
            position: "top-center",
            duration: 3000,
            style: { backgroundColor: "#ffffff", color: "red" },
          });
        }
      } else if (paymentMethod === "bank") {
        const result = await bankPayment(id as string, values);
        if (result.status === "success" && result.session?.url) {
          window.location.href = result.session.url;
        } else {
          toast.error(result.message || "Payment failed!", {
            position: "top-center",
            duration: 3000,
            style: { backgroundColor: "#ffffff", color: "red" },
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred during payment!", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-[90%]">
      <div className="flex flex-col lg:grid lg:grid-cols-7 p-4 md:p-10 gap-8 lg:gap-16">
        <div className="col-span-3 py-6 md:py-12 flex flex-col gap-3 justify-center">
          <h1 className="font-semibold text-3xl mb-5">Billing Details</h1>
          <form
            id="payment-form"
            onSubmit={form.handleSubmit(handlePayment)}
            className="space-y-3"
          >
            <div>
              <Label
                htmlFor="firstName"
                className="text-gray-600 text-sm opacity-50"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                className="mt-1 bg-gray-100 border-0 focus-visible:ring-0"
              />
            </div>

            <div>
              <Label
                htmlFor="companyName"
                className="text-gray-600 text-sm opacity-50"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                className="mt-1 bg-gray-100 border-0 focus-visible:ring-0"
              />
            </div>

            <div>
              <Label
                htmlFor="streetAddress"
                className="text-gray-600 text-sm opacity-50"
              >
                Street Address
              </Label>
              <Input
                id="streetAddress"
                className="mt-1 bg-gray-100 border-0 focus-visible:ring-0"
              />
            </div>

            <Controller
              name="details"
              control={form.control}
              render={({ field }) => (
                <Input {...field} type="hidden" value="details" />
              )}
            />

            <div>
              <Label
                htmlFor="apartment"
                className="text-gray-600 text-sm opacity-50"
              >
                Apartment, floor, etc. (optional)
              </Label>
              <Input
                id="apartment"
                className="mt-1 bg-gray-100 border-0 focus-visible:ring-0"
              />
            </div>

            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label
                    htmlFor={field.name}
                    className="text-gray-600 text-sm opacity-50"
                  >
                    Town/City
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    autoComplete="off"
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className="mt-1 bg-gray-100 border-0 focus-visible:ring-0 data-[invalid=true]:bg-white data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label
                    htmlFor={field.name}
                    className="text-gray-600 text-sm opacity-50"
                  >
                    Phone Number
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    data-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="mt-1 bg-gray-100 border-0 focus-visible:ring-0 data-[invalid=true]:bg-white data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500"
                    />
                  )}
                </Field>
              )}
            />

            <div>
              <Label
                htmlFor="email"
                className="text-gray-600 text-sm opacity-50"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                className="mt-1 bg-gray-100 border-0 focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
              <Label
                htmlFor="saveInfo"
                className="text-sm cursor-pointer font-normal"
              >
                Save this information for faster check-out next time
              </Label>
            </div>
          </form>
        </div>

        <div className="col-span-4 text-sm w-[80%] mx-auto flex items-center py-12">
          <div className="space-y-6 w-full">
            {/* Products List */}
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-13">
                    <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      fill
                      className="object-contain"
                    />
                    {product.count > 1 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                        {product.count}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">{product.product.title}</span>
                </div>
                <span className="font-medium">${product.price}</span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between border-b pb-2">
              <span>Subtotal:</span>
              <span>${cartTotal}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between border-b pb-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            {/* Total */}
            <div className="flex justify-between pb-2">
              <span>Total:</span>
              <span>${cartTotal}</span>
            </div>

            {/* Payment Method */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value as "bank")}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <Label htmlFor="bank" className="cursor-pointer">
                    Bank
                  </Label>
                </div>
                <div className="flex gap-2">
                  <FaCcVisa className="text-3xl text-blue-600" />
                  <SiMastercard className="text-3xl text-orange-600" />
                  <FaCcMastercard className="text-3xl text-red-600" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value as "cash")}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <Label htmlFor="cash" className="cursor-pointer">
                  Cash 
                </Label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="flex gap-2 pt-2">
              <Input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border-gray-300"
              />
              <Button
                type="button"
                variant="outline"
                className="bg-red-600/75 text-white hover:bg-red-700 hover:text-white border-0 px-8"
              >
                Apply Coupon
              </Button>
            </div>

            {/* Place Order Button */}
            {!isSubmitting ? (
              <Button
                type="submit"
                form="payment-form"
                className="w-[40%] cursor-pointer bg-red-600/75 hover:bg-red-700 text-white "
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-red-600/75 px-10 py-5 mt-5 cursor-pointer w-full"
                disabled={true}
                form="payment-form"
              >
                <span className="loader size-6!"></span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
