import { Link } from "react-router";
import { getCity } from "../../api/CityApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const ShowCity = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await getCity(id);
        setCity(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCity();
  }, [id]);

  return (
    <div className="mx-auto w-full max-w-2xl min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/cities" className="transition hover:text-[#F5821F]">
          Cities
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400">{city?.title ?? "…"}</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
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
            <h1 className="text-xl font-semibold text-gray-900">
              {city?.title ?? "…"}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">City details</p>
          </div>
        </div>

        <Link
          to={`/cities/${id}/edit`}
          className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 ring-1 ring-gray-200 transition hover:bg-gray-50"
        >
          Edit
        </Link>
      </div>

      {/* Details card */}
      <div className="w-full rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              City Name
            </dt>
            <dd className="col-span-2 text-sm text-gray-900">{city?.title}</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Created At
            </dt>
            <dd className="col-span-2 text-sm text-gray-900">
              {city?.created_at_formatted}
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Status
            </dt>
            <dd className="col-span-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  city?.status
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {city?.status ? "Active" : "Inactive"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Back link */}
      <div className="mt-5">
        <Link
          to="/cities"
          className="text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← Back to all cities
        </Link>
      </div>
    </div>
  );
};

export default ShowCity;