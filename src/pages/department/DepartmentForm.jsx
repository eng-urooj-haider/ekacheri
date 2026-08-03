import { Link } from "react-router";
import FormLayout from "../../components/common/FormLayout";
import {
  Landmark
} from "lucide-react";
const DepIcon = (<Landmark size={18} strokeWidth={2} />
);
export default function DepartmentForm({ handleChange, handleSubmit, errors, formData, heading }) {
  return (
    <FormLayout heading={heading} icon={DepIcon} listPath="/departments" listLabel="Department">
      <form className="px-7 py-7" noValidate onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="department-name"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-900"
          >
            Title <span className="text-[#fab421]">*</span>
          </label>
          <input
            onChange={handleChange}
            id="department-name"
            name="title"
            value={formData.title}
            type="text"
            className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm text-gray-900 ring-1 ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5821F]/40 disabled:opacity-50"
          />
          {errors && <p className="text-red-600">{errors.title}</p>}
        </div>

        <div className="mt-6">
          <label
            htmlFor="department-email"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-900"
          >
            Email Addresses <span className="text-[#fab421]">*</span>
          </label>
          <input
            onChange={handleChange}
            id="department-email"
            name="email_addresses"
            type="text"
            value={formData.email_addresses}
            placeholder="e.g. hr@company.com"
            className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-900 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-900 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25 disabled:opacity-50"
          />
          {errors && <p className="text-red-600">{errors.email_addresses}</p>}
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
          <Link
            to="/departments"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save Department
          </button>
        </div>
      </form>
    </FormLayout>

  );
}
