import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  getDepartment,
  storeDepartment,
  updateDepartment,
} from "../api/DepartmentApi.js";

const INITIAL_FORM_STATE = {
  title: "",
  email_addresses: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function useDepartmentForm(id) {
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: null } : prev));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Department title is required.";
    }

    if (!formData.email_addresses.trim()) {
      newErrors.email_addresses = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email_addresses.trim())) {
      newErrors.email_addresses = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;
      try {
        if (isEditMode) {
          await updateDepartment(id, formData);
        } else {
          await storeDepartment(formData);
        }
        navigate("/departments");
      } catch (err) {
        const message =
          err.response?.data?.errors?.title?.[0] ??
          err.response?.data?.message ??
          "Something went wrong while saving the department. Please try again.";
        setErrors({ form: message });
      }
    },
    [formData, id, isEditMode, navigate, validate],
  );

  useEffect(() => {
    if (!id) return; // guard: don't fetch on Add

    const fetchDepartment = async () => {
      try {
        const response = await getDepartment(id);
        const data = response.data;
        setFormData({
          title: data.title ?? "",
          email_addresses: data.email_addresses ?? "",
        });
      } catch (err) {
        console.error(err);
        setErrors({ form: "Failed to load department." });
      }
    };

    fetchDepartment();
  }, [id]); // ✅ dependency array added — runs only when `id` changes

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}