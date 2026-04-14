import { z } from "zod";

const pakPhoneRegex = /^(?:\+92|0)[3]\d{9}$/;
const passwordRegex = /^(?=.*[0-9]).{6,}$/;

export const RegisterValidator = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").trim(),
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  phone: z
    .string()
    .regex(
      pakPhoneRegex,
      "Invalid Pakistani phone number format (+923... or 03...)"
    )
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(passwordRegex, "Password must include at least one number"),
});

export const LoginValidator = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});
