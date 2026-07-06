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
                    <Link to="/cities" className="transition hover:text-gray-300">
                        Cities
                    </Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-400">{heading}</span>
                </div>

                {/* Header */}
                <div className="mb-6 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fab421]/10 ring-1 ring-[#fab421]/20">
                        <svg
                            className="size-5 text-[#fab421]"
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
                <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
                    <form className="px-7 py-7" onSubmit={onSubmit} noValidate>
                        <div>
                            <label
                                htmlFor="city-name"
                                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
                            >
                                City Name <span className="text-[#fab421]">*</span>
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
                                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25 disabled:opacity-50"
                            />
                            {error && (
                                <p id="city-name-error" className="mt-1.5 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Status toggle */}
                        <div className="mt-6 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5 ring-1 ring-white/[0.06]">
                            <div>
                                <p className="text-sm font-medium text-gray-200">
                                    {isActive ? "Active" : "Inactive"}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    Inactive cities are hidden from customer-facing forms.
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2.5">
                                <span
                                    className={`text-xs font-medium transition-colors ${
                                        isActive ? "text-[#fab421]" : "text-gray-500"
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
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fab421]/40 disabled:opacity-50 ${
                                        isActive ? "bg-[#fab421]" : "bg-white/[0.12]"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 size-5 rounded-full bg-black transition-transform duration-200 ${
                                            isActive ? "left-[22px]" : "left-0.5"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
                            <Link
                                to="/cities"
                                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {mode == 'create' ? 'Save City'  : 'Update City'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}