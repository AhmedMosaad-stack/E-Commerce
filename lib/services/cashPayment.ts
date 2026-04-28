"use server";

import { paymentSchemaType } from "@/schema/cashPayment.schema";
import { getMytoken } from "@/utilities/getMytoken";

export default async function cashPayment(
  cartId: string,
  formValues: paymentSchemaType
) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(
    `${process.env.API}/orders/${cartId}`,
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
