import { Link } from "react-router";
import FormLayout from "../../components/common/FormLayout";
import {
  MapPin
} from "lucide-react";
const LocationIcon = (<MapPin size={18} strokeWidth={2} />
);

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${hasError
    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
    : "border-gray-200 hover:border-gray-300 focus:border-[#F5821F]/50 focus:ring-[#F5821F]/15"
  }`;

export default function LocationForm({
  cities,
  handleChange,
  toggleButton,
  isActive,
  errors,
  handleSubmit,
  heading,
  location,
  btnText,
}) {
  return (
    <FormLayout heading={heading} icon={LocationIcon} listPath="/locations" listLabel="Location">
      <form className="px-7 py-7" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* City select */}
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              City <span className="text-[#F5821F]">*</span>
            </label>
            <div className="relative">
              <select
                id="city"
                name="city_id"
                value={location.city_id}
                onChange={handleChange}
                className={`appearance-none pr-9 ${inputClass(errors?.city_id)}`}
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.title}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5 10 12.5 15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {errors?.city_id && (
              <p className="mt-1.5 text-xs text-red-500">{errors.city_id}</p>
            )}
          </div>

          {/* Location name input */}
          <div>
            <label
              htmlFor="location-name"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Location <span className="text-[#F5821F]">*</span>
            </label>
            <input
              id="location-name"
              type="text"
              onChange={handleChange}
              name="location"
              value={location.location}
              placeholder="e.g. Gulshan-e-Iqbal"
              className={inputClass(errors?.location)}
            />
            {errors?.location && (
              <p className="mt-1.5 text-xs text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Status toggle */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isActive ? "Active" : "Inactive"}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Inactive locations are hidden from customer-facing forms.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={toggleButton}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5821F]/40
        ${isActive ? "bg-[#F5821F]" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200
          ${isActive ? "left-[22px]" : "left-0.5"}`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            to="/locations"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-[#F5821F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#F5821F]/90"
          >
            {btnText}
          </button>
        </div>
      </form>
    </FormLayout>

  );
}