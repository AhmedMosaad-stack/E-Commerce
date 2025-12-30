import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-[90%] mx-auto py-20 mb-32">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-32">
        <Link href="/" className="hover:text-black">
          Home
        </Link>{" "}
        / <span className="text-black">404 Error</span>
      </div>

      {/* 404 Content */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-8xl font-semibold mb-8">404 Not Found</h1>
        <p className="text-base mb-16">
          Your visited page not found. You may go home page.
        </p>
        <Link href="/">
          <Button className="px-12 py-6 bg-[#DB4444] hover:bg-[#c93939] text-base">
            Back to home page
          </Button>
        </Link>
      </div>
    </div>
  );
}
