"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { LiaMinusSolid } from "react-icons/lia";
import { TfiPlus } from "react-icons/tfi";
import AddCartButton from "./AddCartButton";

export default function Counter({id}: {id: string}) {
  const [counter, setcounter] = useState(1);

  return (
    <div>
      <div className="counter flex flex-col sm:flex-row items-center gap-3 my-5">
        <div className="flex rounded-sm text-center items-center">
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
        <AddCartButton id={id} className="bg-red-600/75 hover:bg-red-700 text-white px-8 sm:px-16 py-5 text-sm w-full sm:w-auto" loadingClassName="bg-red-600/75 px-8 sm:px-16 py-5 text-sm w-full sm:w-auto" />

      </div>
    </div>
  );
}
