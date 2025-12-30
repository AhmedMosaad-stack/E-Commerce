"use server"
import { getMytoken } from "@/utilities/getMytoken";

export async function clearCart() {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await res.json();
  return payload;
}
