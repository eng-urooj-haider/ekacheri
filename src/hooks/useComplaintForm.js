import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  storeComplaint,
  updateComplaint,
  getComplaint,
} from "../api/ComplaintApi.js";
import { getDepartments } from "../api/DepartmentApi.js";
import { checkEkachehriExists } from "../api/EkacheriApi.js";

const useComplaintForm = () => {
  const navigate = useNavigate();
  const { uuid: ekachehriUuid } = useParams(); // present only on /complaints/create/:uuid
  const { id } = useParams(); // present only on /complaints/:id/edit

  const isEditMode = Boolean(id);
  const [EkacheriId, setEkacheriId] = useState("");
  const [complaintDetailsList, setComplaintDetailsList] = useState([""]);
  const [formData, setFormData] = useState({
    customer_type: "",
    customer_number: "",
    name: "",
    contact_number: "",
    telco: "",
    complaint_category: "",
    complaint_type: "",
    complaint_details: "",
    priority: "",
    status: "",
    disposal_status: "",
    closure_date: "",
    closure_time: "",
    department_status: "",
    customer_feedback: "",
  });
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [ekachehriExists, setEkachehriExists] = useState(false);
  const [EkachehriNumber, setEkachehriNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const normalizeDfpIds = (raw) => {
    if (raw == null) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "number") return [raw];
    if (typeof raw === "string") {
      return raw
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "" && !isNaN(v))
        .map((v) => Number(v));
    }
    return [];
  };

  // Fetch existing complaint in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchComplaint = async () => {
      try {
        const response = await getComplaint(id);
        setFormData((prev) => ({
          ...prev,
          ...response.data,
          // NEW: derive customer_type based on whether customer_number exists
          customer_type: response.data.customer_number ? "existing" : "new",
        }));
        const ids = normalizeDfpIds(response.data.department);
        setEkachehriNumber(String(response.data.ekachehri_id).padStart(5, "0"));
        setDepartmentIds(ids);
        setEkacheriId(response.data.ekachehri_id);

        // Populate the dynamic list from the saved comma-separated string
        if (response.data.complaint_details) {
          const splitDetails = response.data.complaint_details
            .split(",")
            .filter((d) => d.trim() !== "");
          setComplaintDetailsList(
            splitDetails.length > 0 ? splitDetails : [""],
          );
        }
      } catch (err) {
        console.error("Error fetching complaint:", err);
        setErrors({ form: "Could not load this complaint." });
      }
    };
    fetchComplaint();
  }, [id, isEditMode]);

  // Fetch department options (needed in both create and edit mode)
  useEffect(() => {
    const fetchDepart = async () => {
      const response = await getDepartments();
      setDepartments(response.data);
    };
    fetchDepart();
  }, []);

  const depOptions = useMemo(
    () =>
      (departments ?? []).map((dep) => ({
        id: dep.id,
        label: dep.title,
      })),
    [departments],
  );

  // Verify parent E-Kachehri exists — CREATE MODE ONLY
  useEffect(() => {
    if (isEditMode) return; // edit mode never needs this check

    if (!ekachehriUuid) {
      setErrors({ form: "No E-Kachehri specified for this complaint." });
      return;
    }

    const verifyEkachehri = async () => {
      try {
        const found = await checkEkachehriExists(ekachehriUuid);
        setEkachehriExists(found);
        setEkachehriNumber(String(found.data.kachehri_number).padStart(5, "0"));
        setEkacheriId(found.data.kachehri_number);
        if (!found) {
          setErrors({ form: "This E-Kachehri could not be found." });
        }
      } catch (err) {
        console.error("Error verifying E-Kachehri:", err);
        setErrors({
          form: "E-Kachehri not found, complaint will not be submitted.",
        });
        setEkachehriExists(false);
      }
    };

    verifyEkachehri();
  }, [ekachehriUuid, isEditMode]);

  const validate = (data) => {
    const validationErrors = {};

    if (!data.customer_type) {
      validationErrors.customer_type = "Customer type is required.";
    }
    if (
      data.customer_number &&
      data.customer_number.trim() &&
      !/^\d{10}$/.test(data.customer_number)
    ) {
      validationErrors.customer_number =
        "Customer number must be exactly 10 digits.";
    }

    if (!data.contact_number.trim()) {
      validationErrors.contact_number = "Contact number is required.";
    } else if (!/^03\d{9}$/.test(data.contact_number)) {
      validationErrors.contact_number =
        "Enter a valid mobile number (e.g. 03001234567).";
    }

    if (!data.name) validationErrors.name = "Customer name is required.";
    if (!data.complaint_category)
      validationErrors.complaint_category = "Please select a category.";
    if (!data.complaint_type)
      validationErrors.complaint_type = "Please select a complaint type.";
    if (!data.complaint_details.trim())
      validationErrors.complaint_details = "Complaint details are required.";
    if (!data.priority) validationErrors.priority = "Please select a priority.";

    return validationErrors;
  };

  const handleSubmit = async () => {
    if (!isEditMode && !ekachehriExists) {
      setErrors({
        form: "Cannot submit — the linked E-Kachehri could not be found.",
      });
      return;
    }

    // Merge complaintDetailsList into a single comma-separated string
    const mergedComplaintDetails = complaintDetailsList
      .map((d) => d.trim())
      .filter((d) => d !== "")
      .join(",");

    const dataToValidate = {
      ...formData,
      complaint_details: mergedComplaintDetails,
    };

    const validationErrors = validate(dataToValidate);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      complaint_details: mergedComplaintDetails,
      departmentIds,
      EkacheriId,
    };

    try {
      if (isEditMode) {
        await updateComplaint(id, payload);
      } else {
        await storeComplaint(payload);
      }
      navigate("/complaints");
    } catch (err) {
      const message = err.response?.data?.errors ?? {
        form:
          err.response?.data?.message ??
          "Something went wrong. Please try again.",
      };
      setErrors(message);
    }
  };

  const addComplaintDetail = () => {
    setComplaintDetailsList((prev) => [...prev, ""]);
  };

  const removeComplaintDetail = (index) => {
    setComplaintDetailsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleComplaintDetailChange = (index, value) => {
    if (errors.complaint_details) {
      setErrors((prev) => ({ ...prev, complaint_details: "" }));
    }
    setComplaintDetailsList((prev) =>
      prev.map((detail, i) => (i === index ? value : detail)),
    );
  };

  return {
    formData,
    departmentIds,
    setDepartmentIds,
    errors,
    handleChange,
    handleSubmit,
    depOptions,
    isEditMode,
    EkachehriNumber,
    addComplaintDetail,
    removeComplaintDetail,
    handleComplaintDetailChange,
    complaintDetailsList,
  };
};

export default useComplaintForm;
