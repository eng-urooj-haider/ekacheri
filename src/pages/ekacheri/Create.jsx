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

// Selected vs. unselected chip styles — selected ones use the same amber
// language as the Attendees field so "chosen" actually looks chosen.
const chipBase = "rounded-lg px-3 py-1.5 text-xs font-medium ring-1 transition-colors duration-150";
const chipSelected = `${chipBase} bg-[#fab421]/15 text-[#fab421] ring-[#fab421]/30`;
const chipUnselected = `${chipBase} bg-white/[0.04] text-gray-400 ring-white/[0.07]`;

const EkacheriCreate = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {/* Header */}
        <div className="border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            Add New E-Kachehri
          </h2>
        </div>

        {/* Fields */}
        <div>
          <FieldRow label="Kachehri number" required>
            <input type="text" placeholder="e.g. 3" className={inputClass} />
          </FieldRow>

          <FieldRow label="Add Attendees" hint="Select one or more attendees.">
            <AddAttendeesMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
            />
          </FieldRow>

          <FieldRow label="Venue" required>
            <input type="text" placeholder="Enter venue" className={inputClass} />
          </FieldRow>

          <FieldRow label="Live Session">
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="radio" name="liveSession" className="size-4 accent-[#fab421]" />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="radio" name="liveSession" className="size-4 accent-[#fab421]" />
                No
              </label>
            </div>
          </FieldRow>

          <FieldRow
            label="Kachehri date"
            required
            hint="Displayed using your browser's date format. Saved as yyyy-mm-dd."
          >
            <input type="date" className={inputClass} />
          </FieldRow>

          <FieldRow label="Kachehri time" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                — Select Time —
              </option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
            </select>
          </FieldRow>

          <FieldRow label="Location" required>
            <input type="text" placeholder="Enter location" className={inputClass} />
          </FieldRow>

          <FieldRow label="Select DFPs" hint="Select one or more DFPs.">
            <div className="flex max-w-md flex-wrap gap-2 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.08]">
              <span className={chipSelected}>DFP — Karachi Central</span>
              <span className={chipSelected}>DFP — Karachi South</span>
              <span className={chipUnselected}>DFP — Hyderabad</span>
            </div>
          </FieldRow>

          <FieldRow label="Status" required>
            <select className={`${inputClass} max-w-xs`} defaultValue="">
              <option value="" disabled>
                Select Status
              </option>
              <option>Pending</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
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

export default EkacheriCreate;