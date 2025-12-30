"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { LiaMinusSolid } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";

export default function Counter() {
  const [counter, setcounter] = useState(1);

  return (
    <div>
      <div className="counter flex items-center  justify-between gap-3 my-5">
        <div className="flex rounded-sm my-3 text-center items-center">
          <div
            className="less border border-gray-400 rounded-l-sm p-3 cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600"
            onClick={() => {
              if (counter > 0) {
                setcounter(counter - 1);
              }
            }}
          >
            <LiaMinusSolid />
          </div>
          <div className="number border border-x-0 border-gray-400 p-2 px-5">
            {counter}
          </div>
          <div
            className="plus border border-gray-400 rounded-r-sm p-3 cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600"
            onClick={() => setcounter(counter + 1)}
          >
            <TfiPlus />
          </div>
        </div>
        <Button className="my-3 p-5 bg-red-600 px-12 rounded-sm cursor-pointer">
          Buy Now
        </Button>

        <CiHeart className="text-[38px] my-3 border border-gray-400 rounded-sm p-1" />
      </div>
    </div>
  );
}
