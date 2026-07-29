import useComplaintForm from "../../hooks/useComplaintForm";
import AddAttendeesMultiSelect from "../../components/multiselect/AddAttendees";
import api from "../../api/axios";
import { useState } from "react";

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
  const [validationError, setValidationError] = useState("");
  const [customerVerified, setCustomerVerified] = useState(false); // NEW
  const [isVerifying, setIsVerifying] = useState(false); // NEW

  const {
    formData,
    departmentIds,
    setDepartmentIds,
    errors,
    handleChange,
    handleSubmit,
    depOptions,
    EkachehriNumber,
    addComplaintDetail,
    removeComplaintDetail,
    handleComplaintDetailChange,
    complaintDetailsList,
  } = useComplaintForm();

  const verifyCustomer = async () => {
    const data = formData.customer_number ?? "";

    if (data.trim() === "") {
      setValidationError("Please enter a customer number.");
      setCustomerVerified(false);
      return;
    }

    setValidationError("");
    setIsVerifying(true); // NEW

    try {
      const response = await api.post("/verify-customer", {
        customer_number: formData.customer_number,
      });

      // NEW: explicit success/failure branching
      if (response.data == 0 || !response.data) {
        setValidationError("This customer does not exist.");
        setCustomerVerified(false);
      } else {
        setValidationError("");
        setCustomerVerified(true); // customer confirmed — allow save to proceed
      }
    } catch (error) {
      console.error("Customer verification failed:", error);
      setValidationError("Failed to verify customer. Please try again.");
      setCustomerVerified(false);
    } finally {
      setIsVerifying(false); // NEW
    }
  };

  // NEW: re-typing the number invalidates any previous verification
  const handleCustomerNumberChange = (e) => {
    handleChange(e);
    setCustomerVerified(false);
    setValidationError("");
  };

  // NEW: block save for unverified existing customers
  const canSave = formData.customer_type !== "existing" || customerVerified;

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
        <div>
          <FieldRow label="Ekachehri Number">
            <input
              type="text"
              className={inputClass}
              value={EkachehriNumber}
              readOnly
            />
          </FieldRow>
          <FieldRow label="Customer Type" required error={errors.customer_type}>
            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="customer_type"
                  value="new"
                  checked={formData.customer_type === "new"}
                  onChange={handleChange}
                  className="size-4 accent-[#fab421]"
                />
                New Customer
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="radio"
                  name="customer_type"
                  value="existing"
                  checked={formData.customer_type === "existing"}
                  onChange={handleChange}
                  className="size-4 accent-[#fab421]"
                />
                Existing Customer
              </label>
            </div>
          </FieldRow>

          {formData.customer_type === "existing" && (
            <FieldRow
              label="Customer Number"
              required
              hint="Enter the existing customer's account number, then click Verify."
              error={errors.customerNumber}
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="customer_number"
                  placeholder="Enter number"
                  className={inputClass}
                  value={formData.customer_number}
                  onChange={handleCustomerNumberChange} // CHANGED
                />
                <button
                  type="button"
                  onClick={verifyCustomer}
                  disabled={isVerifying} // NEW
                  className="shrink-0 rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1] transition hover:bg-white/[0.1] disabled:opacity-50"
                >
                  {isVerifying ? "Verifying…" : "Verify"}
                </button>
              </div>

              {validationError && (
                <p className="mt-1.5 text-xs text-red-400">{validationError}</p>
              )}

              {/* NEW: success feedback */}
              {customerVerified && !validationError && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-400">
                  <svg
                    className="size-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Customer verified.
                </p>
              )}
            </FieldRow>
          )}
          <FieldRow label="Complainant Name" required error={errors.name}>
            <input
              type="text"
              name="name"
              placeholder="Enter customer name"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Telco/Network" error={errors.telco}>
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
          {/* Complaint Details — dynamic list */}
          <FieldRow
            label="Complaint Details"
            required
            error={errors.complaint_details}
          >
            <div className="space-y-3">
              {complaintDetailsList.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <textarea
                    placeholder={`Complaint detail ${index + 1}`}
                    className={`${inputClass} min-h-[80px] resize-y`}
                    value={detail}
                    onChange={(e) =>
                      handleComplaintDetailChange(index, e.target.value)
                    }
                  />
                  {complaintDetailsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeComplaintDetail(index)}
                      className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05] hover:text-red-400"
                      aria-label="Remove this detail"
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addComplaintDetail}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
              >
                <svg
                  className="size-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add Another Detail
              </button>
            </div>
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
            </select>
          </FieldRow>
          <FieldRow label="Department" error={errors.departments}>
            <AddAttendeesMultiSelect
              label="Add Department"
              value={departmentIds}
              options={depOptions}
              onChange={setDepartmentIds}
              text="Select one or more Department"
              placeholder="Select Department"
            />
          </FieldRow>
          <FieldRow label="Status" error={errors.status}>
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

          <FieldRow label="Status Disposal">
            <select
              name="disposal_status"
              className={`${inputClass} max-w-xs`}
              value={formData.disposal_status}
              onChange={handleChange}
            >
              <option value="" disabled className={optionClass}>
                — Select Disposal Status —
              </option>
              <option className={optionClass} value="Relief Granted">
                Relief Granted
              </option>
              <option className={optionClass} value="Partial Relief Granted">
                Partial Relief Granted
              </option>
              <option className={optionClass} value="Relief cannot be Granted">
                Relief cannot be Granted
              </option>
            </select>
          </FieldRow>

          <FieldRow label="Closure Date">
            <input
              type="date"
              name="closure_date"
              placeholder="Enter Date"
              className={inputClass}
              value={formData.closure_date}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Closure Time">
            <input
              type="time"
              name="closure_time"
              placeholder="Enter Time"
              className={inputClass}
              value={formData.closure_time}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Department Status">
            <input
              type="text"
              name="department_status"
              placeholder="Enter Status"
              className={inputClass}
              value={formData.department_status}
              onChange={handleChange}
            />
          </FieldRow>

          <FieldRow label="Customer Feedback">
            <input
              type="text"
              name="customer_feedback"
              placeholder="Enter Feedback"
              className={inputClass}
              value={formData.customer_feedback}
              onChange={handleChange}
            />
          </FieldRow>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={!canSave} // NEW
            className="rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={!canSave} // NEW
            className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1] disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* NEW: hint when save is blocked */}
        {!canSave && (
          <p className="px-5 pb-4 text-xs text-gray-500">
            Please verify the customer number before saving.
          </p>
        )}
      </div>
    </div>
  );
};

export default ComplaintCreate;
