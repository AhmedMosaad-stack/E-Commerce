"use client";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { addToCart } from "@/lib/services/addToCart";
import React, { useState, useContext } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function AddCartButton({ id, className, loadingClassName }: { id: string; className?: string; loadingClassName?: string }) {
  const { cartNumber, setcartNumber } = useContext(CartContext)!;
  const [isLoading, setisLoading] = useState(false);
  const { data: session } = useSession();
  
  async function checkAddtoCart(id: string) {
    // Check if user is logged in first
    if (!session) {
      toast.error("Please Login to add to Cart!", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
      return;
    }
    
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
        <Button className={`cursor-pointer ${className || ""}`} onClick={() => checkAddtoCart(id)}>
          Add To Cart
        </Button>
      ) : (
        <Button disabled={true} className={loadingClassName || ""}>
          <span className="loader size-6! before:bg-white!"></span>
        </Button>
      )}
    </>
  );
}
