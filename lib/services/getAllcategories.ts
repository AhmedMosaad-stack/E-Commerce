"use server"
import { Category } from "../interfaces/category";

export async function getAllcategories() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  const { data }: { data: Category[] } = await res.json();
  return data;
}
