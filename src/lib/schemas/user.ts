import { z } from "zod";

// User role enum
export const UserRoleSchema = z.enum(["USER", "STUDENT", "ADMIN"]);

// Helper to coerce string or number to string
const stringOrNumber = z.union([z.string(), z.number()]).transform(String);

// User object schema - flexible to handle backend variations
export const UserSchema = z.object({
  id: stringOrNumber,
  userId: stringOrNumber,
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: UserRoleSchema,
  mfa: z.boolean(),
  imageUrl: z.string().nullable().optional(),
  qrCodeImageUri: z.string().nullable().optional(),
  lastLogin: z.string().nullable().optional(),
  enabled: z.boolean().optional(),
  accountNonLocked: z.boolean().optional(),
});

// Auth response schemas
export const LoginResponseSchema = z.object({
  user: UserSchema,
  requiresMfa: z.boolean().optional(),
});

export const MfaRequiredResponseSchema = z.object({
  mfaRequired: z.literal(true),
  email: z.string().email(),
});

export const RegisterResponseSchema = z.object({
  message: z.string(),
});

export const UserResponseSchema = z.object({
  user: UserSchema,
});

export const ProfileResponseSchema = z.object({
  user: UserSchema,
});

export const MfaSetupResponseSchema = z.object({
  user: UserSchema,
  // qrCodeSecret is no longer returned by the backend for security reasons.
  // Users should scan the QR code image (qrCodeImageUri in user object) instead.
});

// Type exports for inference
export type UserSchemaType = z.infer<typeof UserSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
