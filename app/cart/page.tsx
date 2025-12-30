"use client";
import { getUserCart } from "@/lib/services/getUserCart";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartProduct } from "@/lib/interfaces/cart";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "../_components/Loader";
import { removeCartItem } from "@/lib/services/removeCartItem";
import { toast } from "sonner";
import { IoIosCloseCircle } from "react-icons/io";
import { updateCartItem } from "@/lib/services/updateCartItem";
import { PiShoppingCartThin } from "react-icons/pi";
import { clearCart } from "@/lib/services/clearCart";
import { CartContext } from "@/context/CartContext";
import { Input } from "@/components/ui/input";

export default function Cart() {
  const { cartNumber, setcartNumber } = useContext(CartContext)!;
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [update, setupdate] = useState(false);
  const [clearBtn, setclearBtn] = useState(false);
  const [cartTotal, setcartTotal] = useState("");
  const [cartID, setcartID] = useState("");
  //get user cart data
  async function getUserCartData() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        setproducts(res.data.products);
        setcartTotal(res.data.totalCartPrice);
        setcartID(res.cartId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  }
  //delete cart item
  async function deleteCartItem(id: string) {
    try {
      const res = await removeCartItem(id);
      console.log(res);
      if (res.status === "success") {
        setproducts(res.data.products);
        setcartTotal(res.data.totalCartPrice);
        toast.success("Item removed successfully!", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "green" },
        });
        let sum = 0;
        res.data.products.forEach((product: CartProduct) => {
          sum += product.count;
        });
        setcartNumber(sum);
      }
    } catch (err) {
      console.log(err);
      toast.error("Item can't be removed.", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    } finally {
      setisLoading(false);
    }
  }
  //update cart item
  async function updateItem(id: string, count: number, sign: string) {
    try {
      setupdate(true);
      const res = await updateCartItem(id, count);
      console.log(res);
      if (res.status === "success") {
        setproducts(res.data.products);
        setcartTotal(res.data.totalCartPrice);
        if (sign === "+") setcartNumber(cartNumber + 1);
        else if (sign === "-") setcartNumber(cartNumber - 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setupdate(false);
    }
  }
  //clear cart items
  async function clearItems() {
    try {
      setclearBtn(true);
      const res = await clearCart();
      if (res.message === "success") {
        setproducts([]);
        setcartNumber(0);
        toast.success("Cart cleared successfully!", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "green" },
        });
        setcartTotal("0");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setclearBtn(false);
    }
  }
  useEffect(() => {
    getUserCartData();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" mx-auto w-[90%] py-10">
      {products?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
          <Table className="w-full table-fixed min-w-[600px]">
            <TableHeader>
              <TableRow className="">
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: CartProduct) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium flex items-center gap-1 max-w-[220px] relative">
                    <IoIosCloseCircle
                      onClick={() => deleteCartItem(product.product._id)}
                      className="absolute top-1 left-1 bg cursor-pointer text-red-600/75"
                    />

                    <Image
                      src={product.product.imageCover}
                      alt={product.product.category.slug}
                      width={50}
                      height={50}
                      className="w-12 h-12 shrink-0"
                    />
                    <p className="truncate">{product.product.title}</p>
                  </TableCell>
                  <TableCell className="text-center py-3">
                    ${product.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2 px-3 text-sm border rounded-sm border-gray-400 w-fit mx-auto">
                      <span>0{product.count}</span>
                      <div className="flex flex-col">
                        <button
                          disabled={update}
                          className="disabled:text-gray-300"
                        >
                          <MdOutlineKeyboardArrowUp
                            className="cursor-pointer"
                            onClick={() => {
                              updateItem(
                                product.product._id,
                                product.count + 1,
                                "+"
                              );
                            }}
                          />
                        </button>
                        <button
                          disabled={update}
                          className="disabled:text-gray-300"
                        >
                          <MdOutlineKeyboardArrowDown
                            className="cursor-pointer"
                            onClick={() => {
                              if (product.count > 0) {
                                updateItem(
                                  product.product._id,
                                  product.count - 1,
                                  "-"
                                );
                              }
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    ${product.count * product.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={"/"}
              className="p-2 text-sm border border-gray-400 mt-5 rounded-sm px-10"
            >
              Return to Shop
            </Link>
            <Button
              variant={"outline"}
              className="rounded-sm border-gray-400 font-normal cursor-pointer px-10"
              onClick={() => clearItems()}
              disabled={clearBtn}
            >
              Clear Cart
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-12">
            <div className="coupon flex flex-col sm:flex-row gap-3 items-stretch w-full lg:w-auto">
              <Input
                type="text"
                placeholder="Coupon code"
                className="border border-gray-400 px-3 py-2 rounded-sm focus:outline-none focus:border-red-600/75 focus-visible:border-red-600/75 focus-visible:ring-red-600/75 focus-visible:ring-[3px] w-full sm:w-auto"
              />
              <Button
                variant={"outline"}
                className="rounded-sm border-red-600/75 font-normal cursor-pointer px-10 text-white bg-red-600/75 w-full sm:w-auto"
              >
                Apply Coupon
              </Button>
            </div>
            <div className="checkout border-[1.5px] border-gray-500 text-[13px] p-5 rounded-sm w-full lg:w-[40%]">
              <div className="flex flex-col gap-2">
                <h6 className="text-black text-[15px]">Cart Total</h6>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between border-t border-gray-400 pt-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between font-bold border-t border-gray-400 pt-2">
                  <span>Total:</span>
                  <span>${cartTotal}</span>
                </div>
                <Link
                  href={`/payment/${cartID}`}
                  className="text-center p-2 w-[75%] mx-auto bg-red-600/75 text-[13px] text-white rounded-sm mt-3"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center min-h-screen text-4xl font-bold">
            <p>
              Cart is <span className="text-red-600/75">Empty!</span>
            </p>
            <PiShoppingCartThin className="text-7xl" />
          </div>
        </>
      )}
    </div>
  );
}
