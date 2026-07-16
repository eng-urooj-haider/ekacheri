/**
 * Add New Complaint — fully controlled form using useComplaintForm.
 * Matches the dark/amber dashboard theme (sidebar, header, DataTable).
 */

import useComplaintForm from "../../hooks/useComplaintForm"; // adjust path
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

const optionClass = "text-gray-900";
const inputClass =
  "w-full max-w-md rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.08] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/30";

const ComplaintCreate = () => {
  const {
    formData,
    departmentIds,
    setDepartmentIds,
    errors,
    handleChange,
    handleSubmit,
    depOptions,
  } = useComplaintForm();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {/* Header */}
        <div className="border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            Add New Complaint
          </h2>
        </div>

        {errors.form && (
          <div className="px-5 pt-4 text-sm text-red-400">{errors.form}</div>
        )}

        {/* Fields */}
        <div>
          {/* FIX: removed the duplicate, uncontrolled "Customer Number" field that was here */}
          <FieldRow
            label="Customer Number"
            required
            error={errors.customer_number}
          >
            <input
              type="number"
              name="customer_number"
              placeholder="Enter number"
              className={inputClass}
              value={formData.customer_number}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Telco/Network" required error={errors.telco}>
            <select
              name="telco"
              className={`${inputClass} max-w-xs`}
              value={formData.telco}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Network —
              </option>
              <option value="Mobilink" className={optionClass}>
                Mobilink
              </option>
              <option value="Telenor" className={optionClass}>
                Telenor
              </option>
              <option value="Ufone" className={optionClass}>
                Ufone
              </option>
              <option value="Warid" className={optionClass}>
                Warid
              </option>
              <option value="Zong" className={optionClass}>
                Zong
              </option>
            </select>
          </FieldRow>

          <FieldRow
            label="Contact Number"
            required
            error={errors.contact_number}
          >
            <input
              type="text"
              name="contact_number"
              placeholder="Enter contact number"
              className={inputClass}
              value={formData.contact_number}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow
            label="Complaint Category"
            required
            error={errors.complaint_category}
          >
            <select
              name="complaint_category"
              className={`${inputClass} max-w-xs`}
              value={formData.complaint_category}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Complaint Category —
              </option>
              <option className={optionClass} value="New Customer">
                New Customer
              </option>
              <option className={optionClass} value="Repeat Customer">
                Repeat Customer
              </option>
            </select>
          </FieldRow>

          <FieldRow
            label="Department"
            hint="Select one or more department."
            error={errors.departments}
          >
            <AddAttendeesMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
              value={departmentIds}
              options={depOptions}
              onChange={(selectedIds) => setDepartmentIds(selectedIds)}
            />
          </FieldRow>

          <FieldRow
            label="Complaint Type"
            required
            error={errors.complaint_type}
          >
            <select
              name="complaint_type"
              className={`${inputClass} max-w-xs`}
              value={formData.complaint_type}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Complaint Type —
              </option>
              <option className={optionClass} value="Complaint">
                Complaint
              </option>
              <option className={optionClass} value="Grievance">
                Grievance
              </option>
              <option className={optionClass} value="Suggestion">
                Suggestion
              </option>
              <option className={optionClass} value="Information Seeking">
                Information Seeking
              </option>
            </select>
          </FieldRow>

          <FieldRow
            label="Complaint Details"
            required
            error={errors.complaint_details}
          >
            <input
              type="text"
              name="complaint_details"
              placeholder="Enter complaint details"
              className={inputClass}
              value={formData.complaint_details}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Priority" required error={errors.priority}>
            <select
              name="priority"
              className={`${inputClass} max-w-xs`}
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Priority —
              </option>
              <option className={optionClass} value="Normal">
                Normal
              </option>
              <option className={optionClass} value="Urgent">
                Urgent
              </option>
              <option className={optionClass} value="Immediate">
                Immediate
              </option>
              <option className={optionClass} value="Cancelled">
                Cancelled
              </option>
            </select>
          </FieldRow>

          <FieldRow label="Status" required error={errors.status}>
            {/* FIX: name="status" moved from the <option> onto the <select> itself */}
            <select
              name="status"
              className={`${inputClass} max-w-xs`}
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Status —
              </option>
              <option className={optionClass} value="Open">
                Open
              </option>
              <option className={optionClass} value="Close">
                Close
              </option>
            </select>
          </FieldRow>
        </div>

        {/* Actions */}
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

export default ComplaintCreate;