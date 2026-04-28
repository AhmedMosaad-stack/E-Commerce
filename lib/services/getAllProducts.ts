"use server"

import { Product } from "../interfaces/product";

export async function getAllProducts() {
  const res = await fetch(`${process.env.API}/products`);
  const { data }: { data: Product[] } = await res.json();
  
  return data
}