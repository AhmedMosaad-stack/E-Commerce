"use server";

import { paymentSchemaType } from "@/schema/cashPayment.schema";
import { getMytoken } from "@/utilities/getMytoken";

export default async function bankPayment(
  cartId: string,
  formValues: paymentSchemaType
) {
  const url = "http://localhost:3000/";
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await res.json();
  return payload;
}
