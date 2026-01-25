import { z } from "zod";

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - parsedDate.getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old"),
});

// Step 2: Address Information Schema
export const addressSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z
    .string()
    .regex(
      /^\d{5}(-\d{4})?$/,
      "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)",
    ),
  country: z.string().min(2, "Please select a country"),
});

// Step 3: Account Settings Schema
export const accountSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^\w+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
    notifications: z.object({
      email: z.boolean(),
      sms: z.boolean(),
      push: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Step 4: Preferences Schema
export const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    message: "Please select a theme",
  }),
  language: z.string().min(1, "Please select a language"),
  interests: z
    .array(z.string())
    .min(1, "Please select at least one interest")
    .max(5, "You can select up to 5 interests"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  termsAccepted: z.literal(true, {
    message: "You must accept the terms and conditions",
  }),
});

// Combined Schema for the entire form
export const fullFormSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  account: accountSchema,
  preferences: preferencesSchema,
});

// Type inference from schemas
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Account = z.infer<typeof accountSchema>;
export type Preferences = z.infer<typeof preferencesSchema>;
export type FullFormData = z.infer<typeof fullFormSchema>;

// Type-safe nested path utility
// Generates union of all valid dot-notation paths like "personalInfo.email" | "account.username"
type NestedKeyOf<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? T[K] extends unknown[]
          ? `${Prefix}${K}`
          : NestedKeyOf<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type FormFieldPath = NestedKeyOf<FullFormData>;

// Form step configuration
export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    id: 2,
    title: "Address",
    description: "Where can we reach you?",
  },
  {
    id: 3,
    title: "Account Settings",
    description: "Set up your account credentials",
  },
  {
    id: 4,
    title: "Preferences",
    description: "Customize your experience",
  },
];
