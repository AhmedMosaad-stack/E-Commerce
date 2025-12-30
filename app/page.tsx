import { getAllProducts } from "@/lib/services/getAllProducts";
import AllProducts from "./_components/AllProducts";
import Categories from "./_components/Categories";
import FirstSlider from "./_components/FirstSlider";
import TodaySale from "./_components/TodaySale/TodaySale";
import { getAllcategories } from "@/lib/services/getAllcategories";
import Image from "next/image";
import jbl from "../public/JBL.png"
import { Button } from "@/components/ui/button";
import Services from "./_components/Services";
export default async function Home() {
  const categories = await getAllcategories();
  const products = await getAllProducts();
  
  
  return (
    <>
      <FirstSlider />
      <TodaySale products={products} />
      <Categories categories={categories} />
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[90%] min-h-[330px] overflow-hidden text-white bg-black my-10">
        <div className="left flex flex-col gap-4 md:gap-7 w-full md:w-[50%] p-6 md:p-10">
          <span className="text-green-400 font-semibold">Categories</span>
          <p className="text-3xl md:text-5xl">Enhance Your <br /> Music Experience</p>
          <Button className="w-full md:w-[40%] mt-3 bg-green-400 rounded-sm cursor-pointer hover:bg-green-800" size={"lg"}>Buy Now!</Button>
        </div>
        <div className="right w-full md:w-[50%]">
          <Image src={jbl} alt="JBL" className="size-full object-contain"/>
        </div>
      </div>
      <AllProducts products={products} />
      <Services/>
    </>
  );
}
