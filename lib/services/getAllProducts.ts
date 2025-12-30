"use server"

import { Product } from "../interfaces/product";

export async function getAllProducts() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const { data }: { data: Product[] } = await res.json();
  
  return data
}
