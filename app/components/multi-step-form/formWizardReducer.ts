import type { FullFormData } from "./types";

// State type for the form wizard
export interface FormWizardState {
  currentStep: number;
  completedSteps: number[];
  isSubmitting: boolean;
  isSubmitted: boolean;
  submittedData: FullFormData | null;
  isValidatingAsync: boolean;
}

// Action types
export type FormWizardAction =
  | { type: "NEXT_STEP"; totalSteps: number }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "COMPLETE_STEP"; step: number }
  | { type: "SET_VALIDATING"; value: boolean }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SUBMIT_SUCCESS"; data: FullFormData }
  | { type: "RESET" };

// Initial state
export const initialState: FormWizardState = {
  currentStep: 1,
  completedSteps: [],
  isSubmitting: false,
  isSubmitted: false,
  submittedData: null,
  isValidatingAsync: false,
};

// Reducer function
export function formWizardReducer(
  state: FormWizardState,
  action: FormWizardAction,
): FormWizardState {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, action.totalSteps + 1),
      };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case "GO_TO_STEP":
      return { ...state, currentStep: action.step };

    case "COMPLETE_STEP":
      return state.completedSteps.includes(action.step)
        ? state
        : { ...state, completedSteps: [...state.completedSteps, action.step] };

    case "SET_VALIDATING":
      return { ...state, isValidatingAsync: action.value };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        submittedData: action.data,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
