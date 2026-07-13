import React from "react";
import DepartmentForm from "./DepartmentForm.jsx";
import { useParams } from "react-router";
import useDepartmentForm from "../../hooks/useDepartmentForm.js";
export default function Edit() {
  const { id } = useParams();
  const { errors, handleChange, handleSubmit , formData } = useDepartmentForm(id);
  return (
    <DepartmentForm
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}
