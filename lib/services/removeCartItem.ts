"use server"
import { getMytoken } from "@/utilities/getMytoken";

export async function removeCartItem(id: string) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await res.json();
  return payload;
}
