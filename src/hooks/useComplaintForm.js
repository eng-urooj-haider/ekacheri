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

  const [formData, setFormData] = useState({
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
    kachehri_id: ekachehriUuid || "",
  });
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  // Only relevant in create mode — edit mode has no uuid to check
  const [isCheckingEkachehri, setIsCheckingEkachehri] = useState(!isEditMode);
  const [ekachehriExists, setEkachehriExists] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    if (name === "customer_number") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 10); // digits only, max 10
    } else if (name === "contact_number") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 11); // digits only, max 11
    }

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
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
        setFormData((prev) => ({ ...prev, ...response.data }));
        const ids = normalizeDfpIds(response.data.department);
        setDepartmentIds(ids);
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
      setIsCheckingEkachehri(false);
      return;
    }

    const verifyEkachehri = async () => {
      setIsCheckingEkachehri(true);
      try {
        const found = await checkEkachehriExists(ekachehriUuid);
        setEkachehriExists(found);
        if (!found) {
          setErrors({ form: "This E-Kachehri could not be found." });
        }
      } catch (err) {
        console.error("Error verifying E-Kachehri:", err);
        setErrors({
          form: "E-Kachehri not found, complaint will not be submitted.",
        });
        setEkachehriExists(false);
      } finally {
        setIsCheckingEkachehri(false);
      }
    };

    verifyEkachehri();
  }, [ekachehriUuid, isEditMode]);

  const validate = (data) => {
    const validationErrors = {};

    if (!data.customer_number.trim()) {
      validationErrors.customer_number = "Customer number is required.";
    } else if (!/^\d{10}$/.test(data.customer_number)) {
      validationErrors.customer_number =
        "Customer number must be exactly 10 digits.";
    }

    if (!data.contact_number.trim()) {
      validationErrors.contact_number = "Contact number is required.";
    } else if (!/^03\d{9}$/.test(data.contact_number)) {
      validationErrors.contact_number =
        "Enter a valid mobile number (e.g. 03001234567).";
    }

    if (!data.telco) validationErrors.telco = "Please select a network.";
    if (!data.complaint_category)
      validationErrors.complaint_category = "Please select a category.";
    if (!data.complaint_type)
      validationErrors.complaint_type = "Please select a complaint type.";
    if (!data.complaint_details.trim())
      validationErrors.complaint_details = "Complaint details are required.";
    if (!data.priority) validationErrors.priority = "Please select a priority.";
    if (!data.status) validationErrors.status = "Please select a status.";
    if (departmentIds.length === 0)
      validationErrors.departments = "Select at least one department.";

    return validationErrors;
  };

  const handleSubmit = async () => {
    // Block submission only in create mode if the parent Ekachehri doesn't exist
    if (!isEditMode && !ekachehriExists) {
      setErrors({
        form: "Cannot submit — the linked E-Kachehri could not be found.",
      });
      return;
    }

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      departmentIds,
      // Only attach the parent E-Kachehri link when creating; on edit,
      // the link already exists via formData.kachehri_id.
      ...(isEditMode ? {} : { ekachehri_uuid: ekachehriUuid }),
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

  return {
    formData,
    departmentIds,
    setDepartmentIds,
    errors,
    handleChange,
    handleSubmit,
    depOptions,
    isEditMode,
    isCheckingEkachehri,
    ekachehriExists,
  };
};

export default useComplaintForm;