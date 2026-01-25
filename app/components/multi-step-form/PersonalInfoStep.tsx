"use client";

import { useFormContext } from "react-hook-form";
import type { FullFormData } from "./types";

export function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FullFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            {...register("personalInfo.firstName")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="John"
          />
          {errors.personalInfo?.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.personalInfo.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            {...register("personalInfo.lastName")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Doe"
          />
          {errors.personalInfo?.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.personalInfo.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register("personalInfo.email")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="john.doe@example.com"
        />
        {errors.personalInfo?.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.personalInfo.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...register("personalInfo.phone")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="+1234567890"
        />
        {errors.personalInfo?.phone && (
          <p className="mt-1 text-sm text-red-500">
            {errors.personalInfo.phone.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Date of Birth *
        </label>
        <input
          id="dateOfBirth"
          type="date"
          {...register("personalInfo.dateOfBirth")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
        />
        {errors.personalInfo?.dateOfBirth && (
          <p className="mt-1 text-sm text-red-500">
            {errors.personalInfo.dateOfBirth.message}
          </p>
        )}
      </div>
    </div>
  );
}
