import { Link } from "react-router";
import FormLayout from "../../components/common/FormLayout";
import {
    Building2
} from "lucide-react";
const cityIcon = (<Building2 size={18} strokeWidth={2} />
);

export default function CityForm({
    title,
    isActive,
    error,
    heading = "Add City",
    onChange,
    onToggleStatus,
    onSubmit,
    mode
}) {
    return (
        <FormLayout heading={heading} icon={cityIcon} listPath="/cities" listLabel="Cities">
            <form className="px-7 py-7" onSubmit={onSubmit} noValidate>
                <div>
                    <label
                        htmlFor="city-name"
                        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
                    >
                        City Name <span className="text-[#F5821F]">*</span>
                    </label>
                    <input
                        id="city-name"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onChange}
                        placeholder="e.g. Lahore"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "city-name-error" : undefined}
                        className="w-full rounded-xl bg-white px-3.5 py-2.5 text-sm text-gray-900 ring-1 ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5821F]/40 disabled:opacity-50"
                    />
                    {error && (
                        <p id="city-name-error" className="mt-1.5 text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

                {/* Status toggle */}
                <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-100">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {isActive ? "Active" : "Inactive"}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                            Inactive cities are hidden from customer-facing forms.
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2.5">
                        <span
                            className={`text-xs font-medium transition-colors ${isActive ? "text-[#F5821F]" : "text-gray-400"
                                }`}
                        >
                            {isActive ? "Active" : "Inactive"}
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isActive}
                            aria-label="Toggle city status"
                            onClick={onToggleStatus}
                            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5821F]/40 disabled:opacity-50 ${isActive ? "bg-[#F5821F]" : "bg-gray-200"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${isActive ? "left-[22px]" : "left-0.5"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-7 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
                    <Link
                        to="/cities"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 ring-1 ring-gray-200 transition hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-lg bg-[#F5821F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#D9631A] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {mode === 'create' ? 'Save City' : 'Update City'}
                    </button>
                </div>
            </form>
        </FormLayout>
    );
}