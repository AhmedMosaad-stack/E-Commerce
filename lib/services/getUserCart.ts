"use server";

import { getMytoken } from "@/utilities/getMytoken";

export async function getUserCart() {
  const token = await getMytoken();

  if (!token) {
    throw new Error("Please log in first!");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
}
