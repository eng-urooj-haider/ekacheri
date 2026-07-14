import DFPForm from "./DFPForm.jsx";
import useDFPForm from "../../hooks/useDFPForm.js";
import { useParams } from "react-router";

const EditDepartmentFocalPerson = () => {
  const { id } = useParams()
  const { formData, errors, handleChange, handleSubmit } = useDFPForm(id);
  return (
    <DFPForm
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditDepartmentFocalPerson;