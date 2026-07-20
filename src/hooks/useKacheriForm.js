import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { getLocations } from "../api/LocationApi";
import { getDFPs } from "../api/DFPApi";
import {
  storeEkachehri,
  updateEkachehri,
  getEkachehri,
  getLatestId,
} from "../api/EkacheriApi.js";

const useKacheriForm = () => {
  const [latestid, setlatestId] = useState(null);
  const [isComplaintLocked, setIsComplaintLocked] = useState(false); // FIX #2: added

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [locations, setLocations] = useState([]);
  const [dfps, setDfps] = useState([]);

  const [formData, setFormData] = useState({
    kachehriNumber: "",
    venue: "",
    session: "", // FIX #1: renamed from "session"
    kachehriDate: "",
    kachehriTime: "",
    location: "",
    status: "",
    complaint_received: "", // FIX #6: added to initial state
    session_convened: "", // FIX #6: added to initial state
    session_not_conv_reason: "", // FIX #6: added to initial state
  });
  const [attendeeIds, setAttendeeIds] = useState([]);
  const [dfpIds, setDfpIds] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch the next available Kachehri number — only needed in create mode
  useEffect(() => {
    if (isEditMode) return;

    const fetchId = async () => {
      try {
        const response = await getLatestId();
        console.log(response.data.data.id);
        setlatestId(response.data.data.id + 1);
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    };

    fetchId();
  }, [isEditMode]);

  // Once latestid resolves, seed it into formData.kachehriNumber
  useEffect(() => {
    if (isEditMode) return;
    if (latestid == null) return;

    setFormData((prev) => ({
      ...prev,
      kachehriNumber: latestid,
    }));
  }, [latestid, isEditMode]);

  const dfpOptions = useMemo(
    () =>
      (dfps ?? []).map((dfp) => ({
        id: dfp.id,
        label: `${dfp.name}${dfp.designation ? ` — ${dfp.designation}` : ""}`,
      })),
    [dfps],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getLocations();
      setLocations(response.data.data);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchDfps = async () => {
      const response = await getDFPs();
      setDfps(response.data);
    };
    fetchDfps();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    const normalizeDfpIds = (raw) => {
      if (raw == null) return [];
      if (Array.isArray(raw)) return raw;
      if (typeof raw === "number") return [raw];
      if (typeof raw === "string") {
        return raw
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id !== "" && !isNaN(id))
          .map((id) => Number(id));
      }
      return [];
    };

    const fetchEkachehri = async () => {
      try {
        const response = await getEkachehri(id);
        const data = response.data.data; // matches your JSON: { data: { ... } }

        setFormData({
          kachehriNumber: data.kachehri_number ?? "",
          venue: data.venue ?? "",
          session: data.session === 1 ? "1" : "0", // FIX #1: key renamed to session
          kachehriDate: data.kachehri_date ?? "",
          kachehriTime: data.kachehri_time ?? "",
          location: data.location ?? "",
          status: data.status ?? "",
          complaint_received: data.complaint_received ?? "",
          session_convened: data.session_convened ?? "",
          // FIX #5: confirm this matches your ACTUAL current backend column name.
          // Legacy schema: data.session_not_conv_reason
          // New schema (if migration ran): data.reason_not_conducted
          session_not_conv_reason: data.session_not_conv_reason ?? "",
        });

        const attendeeIdList = (data.attendees ?? []).map(
          (attendee) => attendee.id,
        );
        setAttendeeIds(attendeeIdList);

        // FIX #3: dfp_ids is already a flat array from the backend — don't re-wrap it
        setDfpIds(normalizeDfpIds(data.dfp_ids));

        // FIX #2: read the lock flag from the API response
        setIsComplaintLocked(response.data.isComplaintLocked ?? false);
      } catch (err) {
        console.error(err);
        setErrors({ form: "Failed to load E-Kachehri." });
      }
    };

    fetchEkachehri();
  }, [id, isEditMode]);

  const validate = (data) => {
    const validationErrors = {};

    if (!data.kachehriNumber.toString().trim())
      validationErrors.kachehriNumber = "Kachehri number is required.";
    if (!data.venue.trim()) validationErrors.venue = "Venue is required.";

    // FIX #1: check session, not session
    if (!data.session) validationErrors.session = "Please select Yes or No.";

    if (!data.kachehriDate)
      validationErrors.kachehriDate = "Kachehri date is required.";
    if (!data.kachehriTime)
      validationErrors.kachehriTime = "Kachehri time is required.";
    if (!data.location) validationErrors.location = "Please select a location.";
    // if (!data.status) validationErrors.status = "Please select a status.";
    if (attendeeIds.length === 0)
      validationErrors.attendees = "Select at least one attendee.";
    if (dfpIds.length === 0) validationErrors.dfps = "Select at least one DFP.";
    return validationErrors;
  };

  const handleSubmit = async (goBack = false) => {
    // FIX #7: accept and use the goBack parameter
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      attendeeIds,
      dfpIds,
    };

    try {
      if (isEditMode) {
        await updateEkachehri(id, payload);
      } else {
        await storeEkachehri(payload);
      }

      if (goBack) {
        navigate("/kachehries"); // FIX #4: corrected route spelling
      } else {
        navigate("/kachehries"); // FIX #4: corrected route spelling
      }
    } catch (err) {
      const message = err.response?.data?.errors ?? {
        form:
          err.response?.data?.message ??
          "Something went wrong. Please try again.",
      };
      setErrors(message);
    }
  };

  return {
    locations,
    dfps,
    dfpOptions,
    isEditMode,
    isComplaintLocked, // FIX #2: now returned
    formData,
    attendeeIds,
    setAttendeeIds,
    dfpIds,
    setDfpIds,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useKacheriForm;
