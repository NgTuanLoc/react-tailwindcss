# Multi-Step Form with React Hook Form & Zod

A type-safe, configurable multi-step form wizard built with React Hook Form, Zod validation, and Tailwind CSS.

## Features

- ✅ **Type-safe** - Full TypeScript support with auto-complete for form fields
- ✅ **Zod validation** - Schema-based validation with custom error messages
- ✅ **Async validation** - Server-side validation (e.g., check if email exists)
- ✅ **Step navigation** - Previous/Next with clickable step indicator
- ✅ **State management** - Clean useReducer pattern
- ✅ **Review step** - Summary before final submission
- ✅ **Dark mode** - Tailwind CSS dark mode support

## File Structure

```
multi-step-form/
├── types.ts              # Zod schemas, TypeScript types, FormFieldPath utility
├── formWizardReducer.ts  # State management (reducer, actions, initial state)
├── formConfig.ts         # Configuration (async validators, default values)
├── MultiStepForm.tsx     # Main component
├── StepIndicator.tsx     # Progress indicator
├── PersonalInfoStep.tsx  # Step 1: Personal info
├── AddressStep.tsx       # Step 2: Address
├── AccountStep.tsx       # Step 3: Account settings
├── PreferencesStep.tsx   # Step 4: Preferences
├── ReviewStep.tsx        # Final review before submit
└── index.ts              # Barrel exports
```

## Usage

```tsx
import { MultiStepForm } from "@/app/components/multi-step-form";

export default function Page() {
  return <MultiStepForm />;
}
```

## Configuration

### Adding Async Validators

Add server-side validation for any field in `formConfig.ts`:

```typescript
export const STEP_ASYNC_VALIDATORS: Record<number, AsyncValidator[]> = {
  1: [
    {
      field: "personalInfo.email",  // Type-safe! Autocomplete available
      validate: async (email) => !(await checkEmailExists(email)),
      errorMessage: "This email is already registered",
    },
    // Add more validators for step 1...
  ],
  3: [
    {
      field: "account.username",
      validate: async (username) => !(await checkUsernameExists(username)),
      errorMessage: "This username is already taken",
    },
  ],
};
```

The `field` property uses `FormFieldPath` type which provides:
- **Autocomplete** for all valid paths
- **Compile-time errors** for typos like `"personalInfo.emial"`

### Modifying Default Values

Update `DEFAULT_FORM_VALUES` in `formConfig.ts`:

```typescript
export const DEFAULT_FORM_VALUES: FullFormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    // ...
  },
  // ...
};
```

### Adding New Steps

1. **Create schema** in `types.ts`:
   ```typescript
   export const paymentSchema = z.object({
     cardNumber: z.string().min(16),
     // ...
   });
   ```

2. **Add to full schema**:
   ```typescript
   export const fullFormSchema = z.object({
     // ...existing steps
     payment: paymentSchema,
   });
   ```

3. **Create step component** (e.g., `PaymentStep.tsx`)

4. **Register in `MultiStepForm.tsx`**:
   ```typescript
   const STEP_COMPONENTS: Record<number, React.FC> = {
     // ...existing
     5: PaymentStep,
   };
   ```

5. **Update `FORM_STEPS`** in `types.ts`

6. **Add field prefix** in `formConfig.ts`:
   ```typescript
   export const STEP_FIELD_PREFIXES = [
     // ...existing
     "payment",
   ] as const;
   ```

## State Management

The form uses `useReducer` for predictable state updates:

```typescript
// Available actions
dispatch({ type: "NEXT_STEP", totalSteps });
dispatch({ type: "PREV_STEP" });
dispatch({ type: "GO_TO_STEP", step: 2 });
dispatch({ type: "COMPLETE_STEP", step: 1 });
dispatch({ type: "SET_VALIDATING", value: true });
dispatch({ type: "SET_SUBMITTING", value: true });
dispatch({ type: "SUBMIT_SUCCESS", data });
dispatch({ type: "RESET" });
```

## Validation Flow

When user clicks "Next":

1. **Zod validation** - Validates current step fields against schema
2. **Async validation** - Runs server-side validators (if configured for current step)
3. **Proceed** - Only advances if both pass

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│ Click Next  │────▶│ Zod Validation   │────▶│ Async       │
└─────────────┘     │ (client-side)    │     │ Validation  │
                    └──────────────────┘     │ (server)    │
                           │                 └─────────────┘
                           │ fail                   │
                           ▼                        │ fail
                    ┌──────────────┐                ▼
                    │ Show errors  │◀───────────────┘
                    └──────────────┘
                                          success
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │ Go to next step │
                                    └─────────────────┘
```

## Type Safety

The `FormFieldPath` utility type generates all valid dot-notation paths:

```typescript
type FormFieldPath = 
  | "personalInfo" 
  | "personalInfo.firstName" 
  | "personalInfo.lastName" 
  | "personalInfo.email"
  | "address"
  | "address.street"
  // ... all valid paths
```

This ensures:
- ✅ Autocomplete when typing field paths
- ✅ Compile-time errors for invalid paths
- ✅ Refactoring safety - rename a field and TypeScript catches all usages

## Dependencies

```json
{
  "react-hook-form": "^7.x",
  "@hookform/resolvers": "^3.x",
  "zod": "^3.x",
  "lucide-react": "^0.x"
}
```

## License

MIT
