import type { FullFormData, FormFieldPath } from "./types";
import { checkEmailExists } from "./PersonalInfoStep";
import { checkUsernameExists } from "./AccountStep";

// Async validator configuration with type-safe field paths
export interface AsyncValidator {
  field: FormFieldPath;
  validate: (value: string) => Promise<boolean>;
  errorMessage: string;
}

// Field prefixes for each step (used for Zod validation)
export const STEP_FIELD_PREFIXES = [
  "personalInfo",
  "address",
  "account",
  "preferences",
] as const;

// Async validations per step - add new validators here
export const STEP_ASYNC_VALIDATORS: Record<number, AsyncValidator[]> = {
  1: [
    {
      field: "personalInfo.email",
      validate: async (email) => !(await checkEmailExists(email)),
      errorMessage: "This email is already registered",
    },
  ],
  3: [
    {
      field: "account.username",
      validate: async (username) => !(await checkUsernameExists(username)),
      errorMessage: "This username is already taken",
    },
  ],
};

// Default form values
export const DEFAULT_FORM_VALUES: FullFormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  account: {
    username: "",
    password: "",
    confirmPassword: "",
    notifications: { email: true, sms: false, push: true },
  },
  preferences: {
    theme: "system",
    language: "",
    interests: [],
    bio: "",
    termsAccepted: false as unknown as true,
  },
};
