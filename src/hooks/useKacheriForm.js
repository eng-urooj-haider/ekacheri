import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { getLocations } from "../api/LocationApi";
import { getDFPs } from "../api/DFPApi";
import { storeEkachehri, updateEkachehri, getEkachehri } from "../api/EkacheriApi.js";
const useKacheriForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // presence of `id` in the URL means "edit mode"
  const isEditMode = Boolean(id);

  const [locations, setLocations] = useState([]);
  const [dfps, setDfps] = useState([]);

  const [formData, setFormData] = useState({
    kachehriNumber: "",
    venue: "",
    liveSession: "",
    kachehriDate: "",
    kachehriTime: "",
    location: "",
    status: "",
  });
  const [attendeeIds, setAttendeeIds] = useState([]);
  const [dfpIds, setDfpIds] = useState([]);
  const [errors, setErrors] = useState({});

  // Reshape dfps -> { id, label } so AddAttendeesMultiSelect can consume it directly
  const dfpOptions = useMemo(
    () =>
      (dfps ?? []).map((dfp) => ({
        id: dfp.id,
        label: `${dfp.name}${dfp.designation ? ` — ${dfp.designation}` : ""}`,
      })),
    [dfps]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch reference data
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

  // Load existing record when editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchEkachehri = async () => {
      try {
        const response = await getEkachehri(id);
        const data = response.data;
        setFormData({
          kachehriNumber: data.kachehriNumber ?? "",
          venue: data.venue ?? "",
          liveSession: data.liveSession ?? "",
          kachehriDate: data.kachehriDate ?? "",
          kachehriTime: data.kachehriTime ?? "",
          location: data.location ?? "",
          status: data.status ?? "",
        });
        setAttendeeIds(data.attendeeIds ?? []);
        setDfpIds(data.dfpIds ?? []);
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

    if (!data.liveSession)
      validationErrors.liveSession = "Please select Yes or No.";

    if (!data.kachehriDate)
      validationErrors.kachehriDate = "Kachehri date is required.";

    if (!data.kachehriTime)
      validationErrors.kachehriTime = "Kachehri time is required.";

    if (!data.location)
      validationErrors.location = "Please select a location.";

    if (!data.status) validationErrors.status = "Please select a status.";

    if (attendeeIds.length === 0)
      validationErrors.attendees = "Select at least one attendee.";

    if (dfpIds.length === 0)
      validationErrors.dfps = "Select at least one DFP.";

    return validationErrors;
  };

  const handleSubmit = async (goBack = false) => {
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
        navigate("/ekachehris");
      } else {
        navigate("/ekachehris"); // adjust if you want to stay on the page after create
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