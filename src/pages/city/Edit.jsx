import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getCity } from "../../api/CityApi.js";

const AddCity = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [saveCity, setSaveCity] = useState({ title: "", status: 0 });
  const isActive = saveCity.status === 1;
  // const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await getCity(id);
        const city = res.data; // adjust if your API wraps differently
        setSaveCity({ title: city.title, status: city.status });
      } catch (err) {
        console.log(err);
      }
    };
    fetchCity();
  }, [id]);
  function submitHandler(e) {
    e.preventDefault();
  }
  const toggleStatus = () => {
    setSaveCity((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };
  return (
    <div className="mx-auto w-full max-w-lg min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/cities" className="transition hover:text-gray-300">
          Cities
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Edit City</span>
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
            <circle
              cx="12"
              cy="10"
              r="2.4"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Edit City</h1>
          <p className="mt-0.5 text-sm text-gray-500"></p>
        </div>
      </div>

      {/* Form card */}
      <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <form className="px-7 py-7" onSubmit={submitHandler}>
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
              value={saveCity.title}
              type="text"
              placeholder="e.g. Lahore"
              className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
            />
          </div>

          {/* Status toggle */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5 ring-1 ring-white/[0.06]">
            <div>
              <p className="text-sm font-medium text-gray-200">Active</p>
              <p className="mt-0.5 text-xs text-gray-500">
                Inactive cities are hidden from customer-facing forms.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={toggleStatus}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fab421]/40
                  ${isActive ? "bg-[#fab421]" : "bg-white/[0.12]"}`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-black transition-transform duration-200
                    ${isActive ? "left-[22px]" : "left-0.5"}`}
              />
            </button>
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
              className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
            >
              Update City
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
