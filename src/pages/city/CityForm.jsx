import { Link } from "react-router";

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
        <div>
            <div className="mx-auto w-full max-w-lg min-w-0">
                {/* Breadcrumb */}
                <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                    <Link to="/cities" className="transition hover:text-[#F5821F]">
                        Cities
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400">{heading}</span>
                </div>

                {/* Header */}
                <div className="mb-6 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F5821F]/10 ring-1 ring-[#F5821F]/20">
                        <svg
                            className="size-5 text-[#F5821F]"
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
                            <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">{heading}</h1>
                    </div>
                </div>

                {/* Form card */}
                <div className="w-full rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
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
                                    className={`text-xs font-medium transition-colors ${
                                        isActive ? "text-[#F5821F]" : "text-gray-400"
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
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5821F]/40 disabled:opacity-50 ${
                                        isActive ? "bg-[#F5821F]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                            isActive ? "left-[22px]" : "left-0.5"
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
                </div>
            </div>
        </div>
    );
}