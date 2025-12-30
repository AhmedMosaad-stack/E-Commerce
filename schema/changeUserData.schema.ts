import * as z from "zod";

export const changeUserDataSchema = z.object({
  name: z.string().nonempty("Please add your name."),
  email: z.string().nonempty("Please add your email.").email("Invalid email format."),
  phone: z.string().nonempty("Please add your phone number.").regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid  phone number."),
});

export type changeUserDataSchemaType = z.infer<typeof changeUserDataSchema>;
