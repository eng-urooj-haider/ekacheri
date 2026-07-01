/**
 * Add New E-Kachehri — layout only, no state or logic
 * (except the Attendees field, which is genuinely interactive).
 * Matches the dark/amber dashboard theme (sidebar, header, DataTable).
 */

import AddAttendeesMultiSelect from "../../components/multiselect/AddAttendees";

const FieldRow = ({ label, required, children, hint }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-white/[0.06] px-5 py-4 sm:grid-cols-3 sm:items-start sm:gap-6">
    <label className="text-sm font-medium text-gray-300 sm:pt-2.5">
      {label}
      {required && <span className="ml-1 text-[#fab421]">*</span>}
    </label>
    <div className="sm:col-span-2">
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  </div>
);

const inputClass =
  "w-full max-w-md rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.08] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/30";
const ComplaintCreate = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {/* Header */}
        <div className="border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            Add New Complaint
          </h2>
        </div>

        {/* Fields */}
        <div>
          <FieldRow label="Customer Number" required>
            <input type="text" placeholder="e.g. 3" className={inputClass} />
          </FieldRow>

          <FieldRow label="Complainant Name" required>
            <input
              type="text"
              placeholder="Enter venue"
              className={inputClass}
            />
          </FieldRow>
          <FieldRow label="Telco/Network" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                — Select Network —
              </option>
              <option>Mobilink</option>
              <option>Telenor</option>
              <option>Ufone</option>
              <option>Warid</option>
              <option>Zong</option>
            </select>
          </FieldRow>
          <FieldRow label="Department" hint="Select one or more department.">
            <AddAttendeesMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
            />
          </FieldRow>
          <FieldRow label="Complaint Type" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                — Select Complaint Type —
              </option>
              <option>Complaint</option>
              <option>Grievance</option>
              <option>Suggestion</option>
              <option>Information Seeking</option>
            </select>
          </FieldRow>

          <FieldRow label="Complaint Details" required>
            <input
              type="text"
              placeholder="Enter complaint details"
              className={inputClass}
            />
          </FieldRow>
          <FieldRow label="Prority" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                Select Prority
              </option>
              <option>Normal</option>
              <option>urgent</option>
              <option>Immediate</option>
              <option>Cancelled</option>
            </select>
          </FieldRow>
          <FieldRow label="Status" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                Select Prority
              </option>
              <option>Open</option>
              <option>Close</option>
            </select>
          </FieldRow>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <button
            type="button"
            className="rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-semibold text-black"
          >
            Save
          </button>
          <button
            type="button"
            className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1]"
          >
            Save and go back to list
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 ring-1 ring-white/[0.08]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCreate;
