"use server";
import { registerSchemaType } from "@/schema/register.schema";

export default async function signup(values: registerSchemaType) {
  const res = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const payload = await res.json();
  return payload;
}
