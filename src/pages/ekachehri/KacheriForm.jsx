import useKacheriForm from "../../hooks/useKacheriForm"; // adjust path
import AddAttendeesMultiSelect from "../../components/multiselect/AddAttendees";

const FieldRow = ({ label, required, children, hint, error }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-white/[0.06] px-5 py-4 sm:grid-cols-3 sm:items-start sm:gap-6">
    <label className="text-sm font-medium text-gray-300 sm:pt-2.5">
      {label}
      {required && <span className="ml-1 text-[#fab421]">*</span>}
    </label>
    <div className="sm:col-span-2">
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  </div>
);

const inputClass =
  "w-full max-w-md rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.08] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/30";

const optionClass = "text-gray-900";

const EkacheriForm = () => {
  const {
    locations,
    dfpOptions,
    isEditMode,
    isComplaintLocked,
    formData,
    attendeeIds,
    setAttendeeIds,
    dfpIds,
    setDfpIds,
    errors,
    handleChange,
    handleSubmit,
  } = useKacheriForm();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <div className="border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            {isEditMode ? "Edit E-Kachehri" : "Add New E-Kachehri"}
          </h2>
        </div>

        {errors.form && (
          <div className="px-5 pt-4 text-sm text-red-400">{errors.form}</div>
        )}

        <div>
          <FieldRow
            label="Kachehri Number"
            required
            error={errors.kachehriNumber}
          >
            <input
              type="text"
              name="kachehriNumber"
              placeholder="e.g. 3"
              className={inputClass}
              value={formData.kachehriNumber}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow
            label="Add Attendees"
            hint="Select one or more attendees."
            error={errors.attendees}
          >
            <AddAttendeesMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
              options={dfpOptions}
              value={attendeeIds}
              onChange={(selectedIds) => setAttendeeIds(selectedIds)}
            />
          </FieldRow>

          <FieldRow label="Venue" required error={errors.venue}>
            <input
              type="text"
              name="venue"
              placeholder="Enter venue"
              className={inputClass}
              value={formData.venue}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Live Session" error={errors.session}>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="session"
                  value="1"
                  checked={formData.session === "1"}
                  onChange={handleChange}
                  className="size-4 accent-[#fab421]"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="session"
                  value="0"
                  checked={formData.session === "0"}
                  onChange={handleChange}
                  className="size-4 accent-[#fab421]"
                />
                No
              </label>
            </div>
          </FieldRow>

          <FieldRow
            label="Kachehri Date"
            required
            hint="Displayed using your browser's date format. Saved as yyyy-mm-dd."
            error={errors.kachehriDate}
          >
            <input
              type="date"
              name="kachehriDate"
              className={inputClass}
              value={formData.kachehriDate}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Kachehri Time" required error={errors.kachehriTime}>
            <input
              type="time"
              name="kachehriTime"
              className={inputClass}
              value={formData.kachehriTime}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Location" required error={errors.location}>
            <select
              name="location"
              className={`${inputClass} max-w-xs`}
              value={formData.location}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Location —
              </option>
              {locations.map((location) => (
                <option
                  key={location.id}
                  value={location.location}
                  className={optionClass}
                >
                  {location.location}-{location.city.title}
                </option>
              ))}
            </select>
          </FieldRow>

          <FieldRow
            label="Select DFP"
            hint="Select one or more DFP."
            error={errors.dfps}
          >
            <AddAttendeesMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
              options={dfpOptions}
              value={dfpIds}
              onChange={(selectedIds) => setDfpIds(selectedIds)}
            />
          </FieldRow>

          {!isEditMode && (
            <FieldRow label="Status" required error={errors.status}>
              <select
                name="status"
                className={`${inputClass} max-w-xs`}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="" disabled className={optionClass}>
                  Select Status
                </option>
                <option value="Active" className={optionClass}>
                  Active
                </option>
                <option value="Inactive" className={optionClass}>
                  Inactive
                </option>
              </select>
            </FieldRow>
          )}

          {isEditMode && (
            <>
              <FieldRow label="Complaint Received">
                <select
                  name="complaint_received"
                  className={`${inputClass} max-w-xs`}
                  value={formData.complaint_received}
                  onChange={handleChange}
                  disabled={isComplaintLocked}
                >
                  <option value="Yes" className={optionClass}>
                    yes
                  </option>
                  <option value="No" className={optionClass}>
                    No
                  </option>
                </select>
              </FieldRow>

              <FieldRow label="Session Convened">
                <select
                  name="session_convened"
                  className={`${inputClass} max-w-xs`}
                  value={formData.session_convened}
                  onChange={handleChange}
                >
                  <option value="Yes" className={optionClass}>
                    Yes
                  </option>
                  <option value="No" className={optionClass}>
                    No
                  </option>
                </select>
              </FieldRow>

              <FieldRow label="If Session Not Conducted (Reason)">
                <select
                  name="session_not_conv_reason"
                  className={`${inputClass} max-w-xs`}
                  value={formData.session_not_conv_reason}
                  onChange={handleChange}
                >
                  <option value=""  className={optionClass}>
                    — Select Reason —
                  </option>
                  <option value="Non Availability Of Landline" className={optionClass}>
                    Non Availability Of Landline
                  </option>
                  <option value="Light Issue" className={optionClass}>
                    Light Issue
                  </option>
                  <option value="Others" className={optionClass}>
                    Others
                  </option>
                </select>
              </FieldRow>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-semibold text-black"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1]"
          >
            Save and go back to list
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 ring-1 ring-white/[0.08]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EkacheriForm;
