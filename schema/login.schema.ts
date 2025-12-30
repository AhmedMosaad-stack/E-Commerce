import * as z from "zod";

export const loginSchema = z
  .object({
    email: z.email().nonempty("Can't be empty"),
    password: z
      .string()
      .nonempty("Can't be empty")
      .min(6, "Minimum Length is 6"),
  })
export type loginSchemaType = z.infer<typeof loginSchema>;
