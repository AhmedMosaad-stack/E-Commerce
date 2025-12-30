"use client";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { addToCart } from "@/lib/services/addToCart";
import React, { useState, useContext } from "react";
import { toast } from "sonner";

export default function AddCartButton({ id }: { id: string }) {
  const { cartNumber, setcartNumber } = useContext(CartContext)!;
  const [isLoading, setisLoading] = useState(false);
  async function checkAddtoCart(id: string) {
    try {
      setisLoading(true);
      const res = await addToCart(id);
      console.log(res);
      if (res?.status === "success") {
        toast.success(res?.message, {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "green" },
        });
        setcartNumber(cartNumber + 1);
      } else {
        toast.error("Can't add products if you are not Logged in.", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "red" },
        });
      }
    } finally {
      setisLoading(false);
    }
  }
  return (
    <>
      {!isLoading ? (
        <Button className="cursor-pointer" onClick={() => checkAddtoCart(id)}>
          Add To Cart
        </Button>
      ) : (
        <Button disabled={true}>
          <span className="loader size-6! before:bg-white!"></span>
        </Button>
      )}
    </>
  );
}
