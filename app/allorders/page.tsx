import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function allOrders() {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-7xl md:text-8xl animate-bounce" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Order Successful!
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
          Thank you for shopping with <span className="font-extrabold text-[#DB4444]">EXCLUSIVE</span>! 
          Your order has been placed successfully.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 md:p-8 space-y-3">
          <p className="text-gray-700">
            We&apos;ve sent a confirmation email with your order details.
          </p>
          <p className="text-gray-700">
            You can track your order status anytime from your account.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="bg-[#DB4444] hover:bg-[#DB4444]/90 px-8 py-6 text-base w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
       
        </div>
      </div>
    </div>
  );
}
