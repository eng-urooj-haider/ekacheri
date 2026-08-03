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
  return <DepartmentForm  btnText="Save Department" heading="Add Department" handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} formData={formData} />;
}
//  <LocationForm
//       cities={cities}
//       handleChange={handleChange}
//       isActive={isActive}
//       toggleButton={toggleButton}
//       errors={errors}
//       handleSubmit={handleSubmit}
//       btnText="Save Location"
//       heading="Add Location"
//       location={location}
//     />