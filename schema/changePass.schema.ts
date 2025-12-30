import * as z from "zod";

export const changePassSchema = z
  .object({
    currentPassword: z.string().nonempty("Can't be empty").min(6, "Minimum Length is 6"),
    password: z.string().nonempty("Can't be empty").min(6, "Minimum Length is 6"),
    rePassword: z.string().nonempty("Can't be empty"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords are not matching!",
  });
export type changePassSchemaType = z.infer<typeof changePassSchema>