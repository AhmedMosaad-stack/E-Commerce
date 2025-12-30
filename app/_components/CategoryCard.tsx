import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Category } from "@/lib/interfaces/category";

export default function CategoryCard({ category}:{category:Category}) {
  return (
    <div className="">
     
      <Card className="py-0! border-gray-300 text-center hover:border-red-600 transition-all duration-250">
        <CardHeader className="p-0 m-0">
          <Image
          src={category.image}
          alt={category.slug}
          width={500}
          height={500}
          className="mx-auto size-[300px] lg:size-[165px]"
        
        />
        </CardHeader>
   
        <CardContent className="p-0 mb-2">
          <p>{category.name}</p>
        </CardContent>
      </Card>
    </div>
  );
}
