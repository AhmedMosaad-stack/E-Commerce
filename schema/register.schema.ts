import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Can't be empty")
      .min(3, "Name can't be less than 3 characters.")
      .max(20, "Name can't be more than 20 characters."),
    email: z.email().nonempty("Can't be empty"),
    password: z.string().nonempty("Can't be empty").min(6, "Minimum Length is 6"),
    rePassword: z.string().nonempty("Can't be empty"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords are not matching!",
  });
export type registerSchemaType = z.infer<typeof registerSchema>