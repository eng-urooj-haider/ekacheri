import React from "react";
import DepartmentForm from "./DepartmentForm.jsx";
import useDepartmentForm from "../../hooks/useDepartmentForm.js";
export default function Create() {
const {
    handleChange,
    handleSubmit,
    errors,
    formData
  } = useDepartmentForm()
  return <DepartmentForm handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} formData={formData} />;
}
