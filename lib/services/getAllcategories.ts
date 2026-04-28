"use server"
import { Category } from "../interfaces/category";

export async function getAllcategories() {
  const res = await fetch(`${process.env.API}/categories`);
  const { data }: { data: Category[] } = await res.json();
  return data;
}
