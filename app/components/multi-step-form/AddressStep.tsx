"use client";

import { useFormContext } from "react-hook-form";
import type { FullFormData } from "./types";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "Other",
];

export function AddressStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FullFormData>();

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Street Address *
        </label>
        <input
          id="street"
          type="text"
          {...register("address.street")}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="123 Main Street, Apt 4B"
        />
        {errors.address?.street && (
          <p className="mt-1 text-sm text-red-500">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            City *
          </label>
          <input
            id="city"
            type="text"
            {...register("address.city")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="New York"
          />
          {errors.address?.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.city.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            State / Province *
          </label>
          <input
            id="state"
            type="text"
            {...register("address.state")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="NY"
          />
          {errors.address?.state && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.state.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            ZIP / Postal Code *
          </label>
          <input
            id="zipCode"
            type="text"
            {...register("address.zipCode")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="10001"
          />
          {errors.address?.zipCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Country *
          </label>
          <select
            id="country"
            {...register("address.country")}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.address?.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.country.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
