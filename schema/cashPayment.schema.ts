import * as z from "zod";

export const cashPaymentSchema = z.object({
  details: z.string(),
  phone: z.string().nonempty("Please add your phone number."),
  city: z.string().nonempty("Please add your city."),
});

export type cashPaymentSchemaType = z.infer<typeof cashPaymentSchema>;
