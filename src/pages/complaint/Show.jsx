/**
 * Complaint Show — read-only detail view.
 * Matches the dark/amber dashboard theme used across Create/Edit forms.
 */

import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getComplaint } from "../../api/ComplaintApi.js";

const Row = ({ label, children }) => (
  <div className="grid grid-cols-1 gap-1 border-b border-white/[0.06] px-5 py-4 sm:grid-cols-3 sm:items-center sm:gap-6">
    <span className="text-sm font-medium text-gray-400">{label}</span>
    <div className="sm:col-span-2 text-sm text-gray-100">
      {children ?? <span className="text-gray-600">—</span>}
    </div>
  </div>
);

const StatusBadge = ({ value }) => {
  if (!value) return <span className="text-gray-600">—</span>;
  const isOpen = value === "Open";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        isOpen
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-white/[0.06] text-gray-400"
      }`}
    >
      {value}
    </span>
  );
};

const PriorityBadge = ({ value }) => {
  if (!value) return <span className="text-gray-600">—</span>;
  const styles = {
    Immediate: "bg-red-400/10 text-red-400",
    Urgent: "bg-[#fab421]/10 text-[#fab421]",
    Normal: "bg-white/[0.06] text-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        styles[value] ?? "bg-white/[0.06] text-gray-400"
      }`}
    >
      {value}
    </span>
  );
};

const ComplaintShow = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await getComplaint(id);
        setComplaint(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load complaint.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-[#0c0c0d] px-5 py-8 text-center text-sm text-gray-400 ring-1 ring-white/[0.07]">
          Loading complaint…
        </div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-[#0c0c0d] px-5 py-8 text-center text-sm text-red-400 ring-1 ring-white/[0.07]">
          {error || "Complaint not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-200">
            Complaint Details
          </h2>
          <Link
            to={`/complaints/${complaint.id}/edit`}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
          >
            Edit
          </Link>
        </div>

        {/* Fields */}
        <div>
          <Row label="Complainant Name">{complaint.name}</Row>
          <Row label="Customer Number">{complaint.customer_number}</Row>
          <Row label="Telco/Network">{complaint.telco}</Row>
          <Row label="Contact Number">{complaint.contact_number}</Row>
          <Row label="Complaint Category">{complaint.complaint_category}</Row>
          <Row label="Complaint Type">{complaint.complaint_type}</Row>
          <Row label="Complaint Details">{complaint.complaint_details}</Row>
          <Row label="Department">
            {/* Prefer the related department's title if it was eager-loaded
                (e.g. complaint.dept?.title or complaint.departments as an
                array for the many-to-many relation); fall back to the raw
                id only if the relation wasn't loaded. */}
            {complaint.dept?.title ??
              (Array.isArray(complaint.departments) && complaint.departments.length > 0
                ? complaint.departments.map((d) => d.title).join(", ")
                : complaint.department)}
          </Row>
          <Row label="Priority">
            <PriorityBadge value={complaint.priority} />
          </Row>
          <Row label="Status">
            <StatusBadge value={complaint.status} />
          </Row>
          <Row label="Department Status">{complaint.department_status}</Row>
          <Row label="Closure Date">{complaint.closure_date}</Row>
          <Row label="Closure Time">{complaint.closure_time_formatted ?? complaint.closure_time}</Row>
          <Row label="Disposal Status">{complaint.disposal_status}</Row>
          <Row label="Customer Feedback">{complaint.customer_feedback}</Row>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <Link
            to="/complaints"
            className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-gray-200 ring-1 ring-white/[0.1] transition hover:bg-white/[0.08]"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintShow;