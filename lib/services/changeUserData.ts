"use server";

import { changeUserDataSchemaType } from "@/schema/changeUserData.schema";
import { getMytoken } from "@/utilities/getMytoken";

export default async function changeUserData(values: changeUserDataSchemaType) {
  const token = await getMytoken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.API}/users/updateMe/`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const payload = await res.json();
  return payload;
}
