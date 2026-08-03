import { Link } from "react-router";
import useDFPForm from "../../hooks/useDFPForm.js";
import AddDepartmentMultiSelect from '../../components/multiselect/AddDepartment.jsx'
import FormLayout from "../../components/common/FormLayout";
import {
  Users
} from "lucide-react";

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-[#F5821F]/50 focus:ring-[#F5821F]/15"
  }`;

const selectClass = (hasError) =>
  `w-full appearance-none rounded-xl border bg-gray-50 px-3.5 py-2.5 pr-9 text-sm text-gray-900 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-[#F5821F]/50 focus:ring-[#F5821F]/15"
  }`;

const ChevronIcon = () => (
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
);

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

const DFPForm = ({heading , btnText}) => {
  const UserIcon = (<Users size={18} strokeWidth={2} />)
  const { formData, errors, submitting, handleChange, handleSubmit, departments, dptOptions, setDeptIds, deptId } = useDFPForm();
  return (
    <FormLayout heading={heading} icon={UserIcon} listPath="/dfps" listLabel="DFP" wide>
      <form className="px-7 py-7" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Name <span className="text-[#F5821F]">*</span>
            </label>
            <input
              id="name"
              onChange={handleChange}
              name="name"
              value={formData.name}
              type="text"
              placeholder="e.g. Ahmed Raza"
              className={inputClass(errors?.name)}
            />
            <FieldError message={errors?.name} />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Email <span className="text-[#F5821F]">*</span>
            </label>
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="name@ssgc.com.pk"
              className={inputClass(errors?.email)}
            />
            <FieldError message={errors?.email} />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Gender <span className="text-[#F5821F]">*</span>
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                id="gender"
                name="gender"
                value={formData.gender}
                className={selectClass(errors?.gender)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <ChevronIcon />
            </div>
            <FieldError message={errors?.gender} />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              className={inputClass(errors?.password)}
            />
            <FieldError message={errors?.password} />
          </div>

          {/* Telco */}
          <div>
            <label
              htmlFor="telco"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Telco <span className="text-[#F5821F]">*</span>
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                value={formData.telco}
                name="telco"
                id="telco"
                className={selectClass(errors?.telco)}
              >
                <option value="" disabled>
                  Select Telco
                </option>
                <option value="jazz">Jazz</option>
                <option value="zong">Zong</option>
                <option value="ufone">Ufone</option>
                <option value="telenor">Telenor</option>
              </select>
              <ChevronIcon />
            </div>
            <FieldError message={errors?.telco} />
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Mobile <span className="text-[#F5821F]">*</span>
            </label>
            <input
              value={formData.mobile}
              onChange={handleChange}
              name="mobile"
              id="mobile"
              type="tel"
              placeholder="e.g. 03001234567"
              className={inputClass(errors?.mobile)}
            />
            <FieldError message={errors?.mobile} />
          </div>

          {/* Executive number */}
          <div>
            <label
              htmlFor="executive-number"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Executive Number <span className="text-[#F5821F]">*</span>
            </label>
            <input
              value={formData.executive_number}
              onChange={handleChange}
              name="executive_number"
              id="executive-number"
              type="text"
              placeholder="e.g. EXEC-2045"
              className={inputClass(errors?.executive_number)}
            />
            <FieldError message={errors?.executive_number} />
          </div>

          {/* Designation */}
          <div>
            <label
              htmlFor="designation"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Designation <span className="text-[#F5821F]">*</span>
            </label>
            <input
              value={formData.designation}
              onChange={handleChange}
              name="designation"
              id="designation"
              type="text"
              placeholder="e.g. Senior Manager"
              className={inputClass(errors?.designation)}
            />
            <FieldError message={errors?.designation} />
          </div>

          {/* Department */}
          <div className="sm:col-span-2">
            <label
              htmlFor="department"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
            >
              Department <span className="text-[#F5821F]">*</span>
            </label>
            <AddDepartmentMultiSelect
              showLabel={false}
              showHelperText={false}
              className="max-w-md"
              options={dptOptions}
              value={deptId}
              onChange={(selectedIds) => setDeptIds(selectedIds)}
            />
            <FieldError message={errors?.department} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            to="/dfps"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 ring-1 ring-gray-200 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#F5821F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#F5821F]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {btnText}
          </button>
        </div>
      </form>
    </FormLayout>
  );
};
export default DFPForm;