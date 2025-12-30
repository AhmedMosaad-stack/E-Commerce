"use server"
import { getMytoken } from "@/utilities/getMytoken";

export async function addToCart(id: string) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const data = await res.json()
  return data;
  
}
