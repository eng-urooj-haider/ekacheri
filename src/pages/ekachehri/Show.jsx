/**
 * Ekachehri Show — read-only detail view.
 * Matches the dark/amber dashboard theme used across Create/Edit/Show pages.
 */

import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getEkachehri } from "../../api/EkacheriApi.js"; // adjust to your actual export name

const Row = ({ label, children }) => (
  <div className="grid grid-cols-1 gap-1 border-b border-white/[0.06] px-5 py-4 sm:grid-cols-3 sm:items-center sm:gap-6">
    <span className="text-sm font-medium text-gray-400">{label}</span>
    <div className="sm:col-span-2 text-sm text-gray-100">
      {children ?? <span className="text-gray-600">—</span>}
    </div>
  </div>
);

const YesNoBadge = ({ value }) => {
  const isYes = value === true || value === 1 || value === "1" || value === "Yes";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        isYes ? "bg-emerald-400/10 text-emerald-400" : "bg-white/[0.06] text-gray-400"
      }`}
    >
      {isYes ? "Yes" : "No"}
    </span>
  );
};

const StatusBadge = ({ value }) => {
  if (!value) return <span className="text-gray-600">—</span>;
  const isActive = value === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        isActive ? "bg-emerald-400/10 text-emerald-400" : "bg-white/[0.06] text-gray-400"
      }`}
    >
      {value}
    </span>
  );
};

const EkachehriShow = () => {
  const { id } = useParams();
  const [ekachehri, setEkachehri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEkachehri = async () => {
      try {
        const response = await getEkachehri(id);
        setEkachehri(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load E-Kachehri.");
      } finally {
        setLoading(false);
      }
    };
    fetchEkachehri();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-[#0c0c0d] px-5 py-8 text-center text-sm text-gray-400 ring-1 ring-white/[0.07]">
          Loading E-Kachehri…
        </div>
      </div>
    );
  }

  if (error || !ekachehri) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-[#0c0c0d] px-5 py-8 text-center text-sm text-red-400 ring-1 ring-white/[0.07]">
          {error || "E-Kachehri not found."}
        </div>
      </div>
    );
  }

  // "Add Complaint" is disabled once 48 hours have passed since the
  // E-Kachehri's date + time.
  const kachehriDateTime = new Date(
    `${ekachehri.kachehri_date}T${ekachehri.kachehri_time ?? "00:00:00"}`
  );
  const hoursSince = (Date.now() - kachehriDateTime.getTime()) / (1000 * 60 * 60);
  const isAddComplaintDisabled = !Number.isNaN(hoursSince) && hoursSince > 48;

  const dfpLabel =
    Array.isArray(ekachehri.dfps) && ekachehri.dfps.length > 0
      ? ekachehri.dfps.map((d) => d.name ?? d.id).join(", ")
      : ekachehri.dfp_ids ?? ekachehri.dfps;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            E-Kachehri Details
          </h2>
        </div>

        {/* Fields */}
        <div>
          <Row label="Venue">{ekachehri.venue}</Row>
          <Row label="Live Session">
            <YesNoBadge value={ekachehri.session} />
          </Row>
          <Row label="Kachehri Date">{ekachehri.kachehri_date_formatted ?? ekachehri.kachehri_date}</Row>
          <Row label="Kachehri Time">{ekachehri.kachehri_time_formatted ?? ekachehri.kachehri_time}</Row>
          <Row label="Location">{ekachehri.location}</Row>
          <Row label="Select DFPs">{dfpLabel}</Row>
          <Row label="Status">
            <StatusBadge value={ekachehri.status} />
          </Row>
          <Row label="Complaint Received">
            <YesNoBadge value={ekachehri.complaint_received} />
          </Row>
          <Row label="Session Convened">
            <YesNoBadge value={ekachehri.session_convened} />
          </Row>
          <Row label="If Session Not Conducted (Reason)">
            {ekachehri.session_not_conducted_reason}
          </Row>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <Link
            to="/kachehries"
            className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1] transition hover:bg-white/[0.08]"
          >
            ← Back to list
          </Link>
        </div>

        {/* Note */}
        <div className="border-t border-white/[0.07] px-5 py-3">
          <p className="text-xs text-red-400">
            <span className="font-semibold">NOTE:</span>{" "}
            Add Complaint will be disabled after 48 hours from E-Kacheri date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EkachehriShow;