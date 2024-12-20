import { z } from "zod";

export const loginValidationSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginValidationSchema>;

export const registerValidationSchema = loginValidationSchema.extend({
  email: z.string().email(),
});

export type RegisterSchemaType = z.infer<typeof registerValidationSchema>;
