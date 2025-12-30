"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMytoken() {
  try {
    const secretToken =
      (await cookies()).get("next-auth.session-token")?.value ||
      (await cookies()).get("__Secure-next-auth.session-token")?.value;
    if (!secretToken) {
      return null;
    }

    const token = await decode({
      token: secretToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    
    return token?.token || null;
  } catch (err) {
    console.log(err);
  }
}
