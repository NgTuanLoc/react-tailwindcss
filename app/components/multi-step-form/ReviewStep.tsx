import type { FullFormData } from "./types";

interface ReviewStepProps {
  data: FullFormData;
  onEdit: (step: number) => void;
}

export function ReviewStep({ data, onEdit }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Please review your information before submitting.
      </p>

      {/* Personal Information */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Personal Information
          </h4>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Name</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.personalInfo.email}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.personalInfo.phone}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Date of Birth</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.personalInfo.dateOfBirth}
            </dd>
          </div>
        </dl>
      </div>

      {/* Address */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">Address</h4>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="md:col-span-2">
            <dt className="text-gray-500 dark:text-gray-400">Street</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.address.street}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">City</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.address.city}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">State</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.address.state}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">ZIP Code</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.address.zipCode}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Country</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.address.country}
            </dd>
          </div>
        </dl>
      </div>

      {/* Account Settings */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Account Settings
          </h4>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Username</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.account.username}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Password</dt>
            <dd className="text-gray-900 dark:text-white">••••••••</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-gray-500 dark:text-gray-400">Notifications</dt>
            <dd className="text-gray-900 dark:text-white">
              {[
                data.account.notifications.email && "Email",
                data.account.notifications.sms && "SMS",
                data.account.notifications.push && "Push",
              ]
                .filter(Boolean)
                .join(", ") || "None selected"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Preferences */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Preferences
          </h4>
          <button
            type="button"
            onClick={() => onEdit(4)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Theme</dt>
            <dd className="text-gray-900 dark:text-white capitalize">
              {data.preferences.theme}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Language</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.preferences.language}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-gray-500 dark:text-gray-400">Interests</dt>
            <dd className="text-gray-900 dark:text-white">
              {data.preferences.interests.join(", ")}
            </dd>
          </div>
          {data.preferences.bio && (
            <div className="md:col-span-2">
              <dt className="text-gray-500 dark:text-gray-400">Bio</dt>
              <dd className="text-gray-900 dark:text-white">
                {data.preferences.bio}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
