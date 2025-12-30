"use server";

import { cashPaymentSchemaType } from "@/schema/cashPayment.schema";
import { getMytoken } from "@/utilities/getMytoken";

export default async function cashPayment(
  cartId: string,
  formValues: cashPaymentSchemaType
) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
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
