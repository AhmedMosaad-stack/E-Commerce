import { changePassSchemaType } from "@/schema/changePass.schema";
import { getMytoken } from "@/utilities/getMytoken";

export default async function changePass(values: changePassSchemaType) {
  const token = await getMytoken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
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
