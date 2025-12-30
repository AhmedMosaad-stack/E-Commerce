"use server"

import { getMytoken } from "@/utilities/getMytoken";

export async function updateCartItem(id: string, count: number) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({count})
  });
  const payload = await res.json();
  return payload;
}
