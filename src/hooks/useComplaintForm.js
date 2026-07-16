import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { storeComplaint , updateComplaint} from "../api/ComplaintApi.js";
import { getDepartments } from "../api/DepartmentApi.js";
import { checkEkachehriExists } from "../api/EkacheriApi.js"; // NEW — see below

const useComplaintForm = () => {
  const navigate = useNavigate();
  const { uuid: ekachehriUuid } = useParams(); // this uuid belongs to the Ekachehri, not the Complaint
  const { id } = useParams(); // this uuid belongs to the Ekachehri, not the Complaint

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    customer_number: "",
    contact_number: "",
    telco: "",
    complaint_category: "",
    complaint_type: "",
    complaint_details: "",
    priority: "",
    status: "",
  });
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isCheckingEkachehri, setIsCheckingEkachehri] = useState(true);
  const [ekachehriExists, setEkachehriExists] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    if (name === "customer_number") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 10); // digits only, max 10
    }

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };
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
        label: `${dep.title}${dep.title ? ` — ${dep.title}` : ""}`,
      })),
    [departments],
  );

  // Verify the referenced Ekachehri actually exists, as soon as the page loads —
  // not just at submit time — so the user sees the error immediately instead
  // of filling out the whole form first.
  useEffect(() => {
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
          form: "Something went wrong while verifying the E-Kachehri.",
        });
        setEkachehriExists(false);
      } finally {
        setIsCheckingEkachehri(false);
      }
    };

    verifyEkachehri();
  }, [ekachehriUuid]);

  const validate = (data) => {
    const validationErrors = {};

    if (!data.customer_number.trim())
      validationErrors.customer_number = "Customer number is required.";
    if (!data.contact_number.trim()) {
      validationErrors.contact_number = "Contact number is required.";
    } else if (!/^03\d{9}$/.test(data.mobile)) {
      validationErrors.mobile =
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
    // Block submission entirely if the parent Ekachehri doesn't exist
    if (!ekachehriExists) {
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
      ekachehri_uuid: ekachehriUuid, // links this complaint to its parent Ekachehri
    };

    try {
      if (isEditMode) {
        await storeComplaint(payload); // always CREATE — never update
      } else {
        await updateComplaint(payload); // always CREATE — never update
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
    isCheckingEkachehri,
    ekachehriExists,
  };
};

export default useComplaintForm;
