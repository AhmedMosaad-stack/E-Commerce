import * as z from "zod";

export const paymentSchema = z.object({
  details: z.string(),
  phone: z
    .string()
    .nonempty("Please add your phone number.")
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 01012345678)."),
  city: z
    .string()
    .nonempty("Please add your city.")
    .min(3, "City must be at least 3 characters long.")
    .regex(/^[a-zA-Z\s]+$/, "City name should contain only letters and spaces."),
});

export type paymentSchemaType = z.infer<typeof paymentSchema>;
