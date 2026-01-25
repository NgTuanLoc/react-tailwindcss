"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FORM_STEPS, fullFormSchema, type FullFormData } from "./types";

import { StepIndicator } from "./StepIndicator";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { AddressStep } from "./AddressStep";
import { AccountStep } from "./AccountStep";
import { PreferencesStep } from "./PreferencesStep";
import { ReviewStep } from "./ReviewStep";

// Field prefixes for each step (used for validation)
const stepFieldPrefixes = [
  "personalInfo",
  "address",
  "account",
  "preferences",
] as const;

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FullFormData | null>(null);

  const totalSteps = FORM_STEPS.length;
  const isReviewStep = currentStep === totalSteps + 1;

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
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
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
      },
      preferences: {
        theme: "system",
        language: "",
        interests: [],
        bio: "",
        termsAccepted: false as unknown as true,
      },
    },
  });

  const { handleSubmit, trigger, getValues, formState } = methods;

  // Validate current step before proceeding
  const validateCurrentStep = useCallback(async () => {
    const prefix = stepFieldPrefixes[currentStep - 1];
    const fieldsToValidate = Object.keys(getValues(prefix) || {}).map(
      (field) => `${prefix}.${field}` as keyof FullFormData,
    );

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  }, [currentStep, trigger, getValues]);

  // Handle next step
  const handleNext = async () => {
    const isValid = await validateCurrentStep();

    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle step click from indicator
  const handleStepClick = (step: number) => {
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FullFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted successfully:", data);
      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit from review step
  const handleEditFromReview = (step: number) => {
    setCurrentStep(step);
  };

  // Reset form
  const handleReset = () => {
    methods.reset();
    setCurrentStep(1);
    setCompletedSteps([]);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // Success state
  if (isSubmitted && submittedData) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
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
              {currentStep === 1 && <PersonalInfoStep />}
              {currentStep === 2 && <AddressStep />}
              {currentStep === 3 && <AccountStep />}
              {currentStep === 4 && <PreferencesStep />}
              {isReviewStep && (
                <ReviewStep data={getValues()} onEdit={handleEditFromReview} />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {!isReviewStep && (
                  <>
                    Step {currentStep} of {totalSteps}
                  </>
                )}
              </div>

              {isReviewStep ? (
                <button
                  type="submit"
                  disabled={isSubmitting || !formState.isValid}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    isSubmitting || !formState.isValid
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentStep === totalSteps ? "Review" : "Next"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
