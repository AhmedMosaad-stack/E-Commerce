import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";

export default function Services() {
  return (
    <div className="mx-auto w-[90%] p-10 my-12">
      <div className="grid grid-cols-3 gap-20">
        {/* Free Delivery */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
              <TbTruckDelivery className="text-3xl text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">FREE AND FAST DELIVERY</h3>
          <p className="text-sm">Free delivery for all orders over $140</p>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
              <RiCustomerService2Line className="text-3xl text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
          <p className="text-sm">Friendly 24/7 customer support</p>
        </div>

        {/* Money Back */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
              <MdOutlineVerifiedUser className="text-3xl text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">MONEY BACK GUARANTEE</h3>
          <p className="text-sm">We reurn money within 30 days</p>
        </div>
      </div>
    </div>
  );
}
