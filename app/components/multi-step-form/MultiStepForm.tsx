"use client";

import { useReducer, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";

import { FORM_STEPS, fullFormSchema, type FullFormData } from "./types";
import { formWizardReducer, initialState } from "./formWizardReducer";
import {
  STEP_FIELD_PREFIXES,
  STEP_ASYNC_VALIDATORS,
  DEFAULT_FORM_VALUES,
} from "./formConfig";

import { StepIndicator } from "./StepIndicator";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { AddressStep } from "./AddressStep";
import { AccountStep } from "./AccountStep";
import { PreferencesStep } from "./PreferencesStep";
import { ReviewStep } from "./ReviewStep";

// Step components mapping for cleaner rendering
const STEP_COMPONENTS: Record<number, React.FC> = {
  1: PersonalInfoStep,
  2: AddressStep,
  3: AccountStep,
  4: PreferencesStep,
};

export function MultiStepForm() {
  const [state, dispatch] = useReducer(formWizardReducer, initialState);
  const {
    currentStep,
    completedSteps,
    isSubmitting,
    isSubmitted,
    submittedData,
    isValidatingAsync,
  } = state;

  const totalSteps = FORM_STEPS.length;
  const isReviewStep = currentStep > totalSteps;

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { handleSubmit, trigger, getValues, setError, formState } = methods;

  // Validate current step fields using Zod schema
  const validateCurrentStep = useCallback(async () => {
    const prefix = STEP_FIELD_PREFIXES[currentStep - 1];
    const fields = Object.keys(getValues(prefix) || {}).map(
      (field) => `${prefix}.${field}` as keyof FullFormData,
    );
    return trigger(fields);
  }, [currentStep, trigger, getValues]);

  // Run async validations (e.g., check email/username exists on server)
  const runAsyncValidations = useCallback(async (): Promise<boolean> => {
    const validators = STEP_ASYNC_VALIDATORS[currentStep];
    if (!validators?.length) return true;

    dispatch({ type: "SET_VALIDATING", value: true });

    try {
      for (const { field, validate, errorMessage } of validators) {
        const value = getValues(field as keyof FullFormData);
        if (!value) continue;

        if (!(await validate(value as string))) {
          setError(field as keyof FullFormData, {
            type: "manual",
            message: errorMessage,
          });
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Async validation error:", error);
      return false;
    } finally {
      dispatch({ type: "SET_VALIDATING", value: false });
    }
  }, [currentStep, getValues, setError]);

  // Navigation handlers
  const handleNext = async () => {
    if (!(await validateCurrentStep())) return;
    if (!(await runAsyncValidations())) return;

    dispatch({ type: "COMPLETE_STEP", step: currentStep });
    dispatch({ type: "NEXT_STEP", totalSteps });
  };

  const handlePrevious = () => dispatch({ type: "PREV_STEP" });

  const handleStepClick = (step: number) => {
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      dispatch({ type: "GO_TO_STEP", step });
    }
  };

  // Form submission
  const onSubmit = async (data: FullFormData) => {
    dispatch({ type: "SET_SUBMITTING", value: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API
      dispatch({ type: "SUBMIT_SUCCESS", data });
    } catch (error) {
      console.error("Submission error:", error);
      dispatch({ type: "SET_SUBMITTING", value: false });
    }
  };

  const handleReset = () => {
    methods.reset();
    dispatch({ type: "RESET" });
  };

  // Render success state
  if (isSubmitted && submittedData) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Registration Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome, {submittedData.personalInfo.firstName}! Your account has
            been created successfully.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Render current step component
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isReviewStep ? "Review & Submit" : "Create Your Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isReviewStep
              ? "Please review your information before submitting"
              : FORM_STEPS[currentStep - 1]?.description}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="px-6 border-b border-gray-200 dark:border-gray-700">
          <StepIndicator
            steps={FORM_STEPS}
            currentStep={Math.min(currentStep, totalSteps)}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
          />
        </div>

        {/* Form Content */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              {StepComponent ? (
                <StepComponent />
              ) : (
                <ReviewStep
                  data={getValues()}
                  onEdit={(step) => dispatch({ type: "GO_TO_STEP", step })}
                />
              )}
            </div>

            {/* Navigation */}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              isReviewStep={isReviewStep}
              isSubmitting={isSubmitting}
              isValidatingAsync={isValidatingAsync}
              isFormValid={formState.isValid}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

// Extracted navigation component for cleaner main component
interface FormNavigationProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly isReviewStep: boolean;
  readonly isSubmitting: boolean;
  readonly isValidatingAsync: boolean;
  readonly isFormValid: boolean;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
}

function FormNavigation({
  currentStep,
  totalSteps,
  isReviewStep,
  isSubmitting,
  isValidatingAsync,
  isFormValid,
  onPrevious,
  onNext,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastFormStep = currentStep === totalSteps;

  return (
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isFirstStep
            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        Previous
      </button>

      {/* Step Counter */}
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {!isReviewStep && `Step ${currentStep} of ${totalSteps}`}
      </span>

      {/* Next/Submit Button */}
      {isReviewStep ? (
        <SubmitButton isSubmitting={isSubmitting} isDisabled={!isFormValid} />
      ) : (
        <NextButton
          isValidating={isValidatingAsync}
          label={isLastFormStep ? "Review" : "Next"}
          onClick={onNext}
        />
      )}
    </div>
  );
}

function SubmitButton({
  isSubmitting,
  isDisabled,
}: {
  readonly isSubmitting: boolean;
  readonly isDisabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isDisabled}
      className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-white ${
        isSubmitting || isDisabled
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Registration"
      )}
    </button>
  );
}

function NextButton({
  isValidating,
  label,
  onClick,
}: {
  readonly isValidating: boolean;
  readonly label: string;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isValidating}
      className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-white ${
        isValidating
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isValidating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Validating...
        </>
      ) : (
        label
      )}
    </button>
  );
}
