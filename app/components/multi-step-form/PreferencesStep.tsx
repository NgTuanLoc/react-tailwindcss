"use client";

import { useFormContext, Controller } from "react-hook-form";
import type { FullFormData } from "./types";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
];

const INTERESTS = [
  "Technology",
  "Sports",
  "Music",
  "Travel",
  "Food",
  "Gaming",
  "Reading",
  "Photography",
  "Fitness",
  "Art",
];

export function PreferencesStep() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<FullFormData>();

  const selectedInterests = watch("preferences.interests") || [];
  const bio = watch("preferences.bio") || "";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theme *
        </label>
        <div className="flex flex-wrap gap-3">
          {(["light", "dark", "system"] as const).map((theme) => (
            <label
              key={theme}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={theme}
                {...register("preferences.theme")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {theme}
              </span>
            </label>
          ))}
        </div>
        {errors.preferences?.theme && (
          <p className="mt-1 text-sm text-red-500">
            {errors.preferences.theme.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Preferred Language *
        </label>
        <select
          id="language"
          {...register("preferences.language")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        {errors.preferences?.language && (
          <p className="mt-1 text-sm text-red-500">
            {errors.preferences.language.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Interests * (Select 1-5)
        </label>
        <Controller
          name="preferences.interests"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const isSelected = field.value?.includes(interest);
                const isDisabled =
                  !isSelected && (field.value?.length || 0) >= 5;

                return (
                  <button
                    key={interest}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      const currentValue = field.value || [];
                      if (isSelected) {
                        field.onChange(
                          currentValue.filter((i: string) => i !== interest),
                        );
                      } else if (currentValue.length < 5) {
                        field.onChange([...currentValue, interest]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isDisabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          )}
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Selected: {selectedInterests.length}/5
        </p>
        {errors.preferences?.interests && (
          <p className="mt-1 text-sm text-red-500">
            {errors.preferences.interests.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Bio (Optional)
        </label>
        <textarea
          id="bio"
          {...register("preferences.bio")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
          placeholder="Tell us a bit about yourself..."
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {bio.length}/500 characters
        </p>
        {errors.preferences?.bio && (
          <p className="mt-1 text-sm text-red-500">
            {errors.preferences.bio.message}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("preferences.termsAccepted")}
            className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            *
          </span>
        </label>
        {errors.preferences?.termsAccepted && (
          <p className="mt-1 text-sm text-red-500">
            {errors.preferences.termsAccepted.message}
          </p>
        )}
      </div>
    </div>
  );
}
