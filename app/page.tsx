import { getAllProducts } from "@/lib/services/getAllProducts";
import AllProducts from "./_components/AllProducts";
import Categories from "./_components/Categories";
import FirstSlider from "./_components/FirstSlider";
import TodaySale from "./_components/TodaySale/TodaySale";
import { getAllcategories } from "@/lib/services/getAllcategories";
import Image from "next/image";
import jbl from "../public/JBL.png"
import { Button } from "@/components/ui/button";
import ScrollAnimation from "./_components/ScrollAnimation";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
export default async function Home() {
  const categories = await getAllcategories();
  const products = await getAllProducts();
  
  
  return (
    <>
      <ScrollAnimation />
      <div>
        <FirstSlider />
      </div>
      <div className="scroll-section">
        <TodaySale products={products} />
      </div>
      <div className="scroll-section">
        <Categories categories={categories} />
      </div>
      <div className="scroll-section flex flex-col md:flex-row items-center justify-between mx-auto w-[90%] min-h-[330px] overflow-hidden text-white bg-black my-10">
        <div className="left flex flex-col gap-4 md:gap-7 w-full md:w-[50%] p-6 md:p-10">
          <span className="text-green-400 font-semibold">Categories</span>
          <p className="text-3xl md:text-5xl">Enhance Your <br /> Music Experience</p>
          <Button className="w-full md:w-[40%] mt-3 bg-green-400 rounded-sm cursor-pointer hover:bg-green-800" size={"lg"}>Buy Now!</Button>
        </div>
        <div className="right w-full md:w-[50%] max-w-[500px] max-h-[400px]">
          <Image src={jbl} alt="JBL" className="w-full h-full object-contain"/>
        </div>
      </div>
      <div className="scroll-section">
        <AllProducts products={products} />
      </div>
      <div className="scroll-section w-[90%] mx-auto mb-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
        {/* Free Delivery */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
              <TbTruckDelivery className="text-3xl text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            FREE AND FAST DELIVERY
          </h3>
          <p className="text-sm">Free delivery for all orders over $140</p>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
              <RiCustomerService2Line className="text-3xl text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            24/7 CUSTOMER SERVICE
          </h3>
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
    </>
  );
}
