import React from "react";
import { Link } from "react-router";

export default function LocationForm({
  cities,
  handleChange,
  toggleButton,
  isActive,
}) {
  return (
    <div className="mx-auto w-full max-w-lg min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/locations" className="transition hover:text-gray-300">
          Locations
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Add Location</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fab421]/10 ring-1 ring-[#fab421]/20">
          <svg
            className="size-5 text-[#fab421]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="2.4"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Add Location</h1>
        </div>
      </div>

      {/* Form card */}
      <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <form className="px-7 py-7">
          <div className="space-y-6">
            {/* City select */}
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                City <span className="text-[#fab421]">*</span>
              </label>
              <div className="relative">
                <select
                  id="city"
                  name="city"
                  value={location.city}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl bg-white/[0.04] px-3.5 py-2.5 pr-9 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 hover:bg-white/[0.06] hover:ring-[#fab421]/20 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#fab421]/25"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1a1a1b] text-gray-500"
                  >
                    Select a city
                  </option>
                  {cities.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                      className="bg-[#1a1a1b] text-gray-200"
                    >
                      {city.title}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500"
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
            </div>

            {/* Location name input */}
            <div>
              <label
                htmlFor="location-name"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Location <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="location-name"
                type="text"
                onChange={handleChange}
                name="location"
                value={location.location}
                placeholder="e.g. Gulshan-e-Iqbal"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Status toggle */}
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5 ring-1 ring-white/[0.06]">
              <div>
                <p className="text-sm font-medium text-gray-200">
                  {" "}
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
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fab421]/40
        ${isActive ? "bg-[#fab421]" : "bg-white/[0.12]"}`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-black transition-transform duration-200
          ${isActive ? "left-[22px]" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
            <Link
              to="/locations"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
            >
              Save Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
