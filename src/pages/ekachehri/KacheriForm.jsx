import useKacheriForm from "../../hooks/useKacheriForm";
import AddAttendeesMultiSelect from "../../components/multiselect/AddAttendees";

const FieldRow = ({ label, required, children, hint, error }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-gray-100 px-5 py-4 sm:grid-cols-3 sm:items-start sm:gap-6">
    <label className="text-sm font-medium text-gray-700 sm:pt-2.5">
      {label}
      {required && <span className="ml-1 text-[#F5821F]">*</span>}
    </label>
    <div className="sm:col-span-2">
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  </div>
);

const inputClass = (hasError) =>
  `w-full max-w-md rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-[#F5821F]/50 focus:ring-[#F5821F]/15"
  }`;

// local-date-safe helper, avoids UTC/toISOString off-by-one-day bug
const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EkacheriForm = () => {
  const today = getLocalDateString(new Date());
  const now = new Date();

  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;

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
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-900">
            {isEditMode ? "Edit E-Kachehri" : "Add New E-Kachehri"}
          </h2>
        </div>

        {errors.form && (
          <div className="px-5 pt-4 text-sm text-red-500">{errors.form}</div>
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
              className={`${inputClass(errors.kachehriNumber)} cursor-not-allowed bg-gray-100 text-gray-500`}
              value={formData.kachehriNumber}
              readOnly
            />
          </FieldRow>

          <FieldRow
            label="Add Attendees"
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
              className={inputClass(errors.venue)}
              value={formData.venue}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Live Session" error={errors.session}>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="session"
                  value="1"
                  checked={formData.session === "1"}
                  onChange={handleChange}
                  className="size-4 accent-[#F5821F]"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="session"
                  value="0"
                  checked={formData.session === "0"}
                  onChange={handleChange}
                  className="size-4 accent-[#F5821F]"
                />
                No
              </label>
            </div>
          </FieldRow>

          <FieldRow
            label="Kachehri Date"
            required
            hint="yyyy-mm-dd"
            error={errors.kachehriDate}
          >
            <input
              type="date"
              name="kachehriDate"
              className={inputClass(errors.kachehriDate)}
              value={formData.kachehriDate}
              onChange={handleChange}
              min={today}
            />
          </FieldRow>

          <FieldRow label="Kachehri Time" required error={errors.kachehriTime}>
            <input
              type="time"
              name="kachehriTime"
              className={inputClass(errors.kachehriTime)}
              value={formData.kachehriTime}
              onChange={handleChange}
              min={formData.kachehriDate === today ? currentTime : undefined}
            />
          </FieldRow>

          <FieldRow label="Location" required error={errors.location}>
            <select
              name="location"
              className={`${inputClass(errors.location)} max-w-xs`}
              value={formData.location}
              onChange={handleChange}
            >
              <option value="" disabled>
                — Select Location —
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.location}>
                  {location.location}-{location.city.title}
                </option>
              ))}
            </select>
          </FieldRow>

          <FieldRow
            label="Select DFP"
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

          {isEditMode && (
            <>
              <FieldRow label="Complaint Received">
                <select
                  name="complaint_received"
                  className={`${inputClass()} max-w-xs disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500`}
                  value={formData.complaint_received}
                  onChange={handleChange}
                  disabled={isComplaintLocked}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </FieldRow>

              <FieldRow label="Session Convened">
                <select
                  name="session_convened"
                  className={`${inputClass()} max-w-xs`}
                  value={formData.session_convened}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </FieldRow>

              <FieldRow label="If Session Not Conducted (Reason)">
                <select
                  name="session_not_conv_reason"
                  className={`${inputClass()} max-w-xs`}
                  value={formData.session_not_conv_reason}
                  onChange={handleChange}
                >
                  <option value="">— Select Reason —</option>
                  <option value="Non Availability Of Landline">
                    Non Availability Of Landline
                  </option>
                  <option value="Light Issue">Light Issue</option>
                  <option value="Others">Others</option>
                </select>
              </FieldRow>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="rounded-xl bg-[#F5821F] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#F5821F]/90"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-200"
          >
            Save and go back to list
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EkacheriForm;