import { useNavigate } from "react-router";
import DFPForm from "./DFPForm.jsx";
import useDFPForm from "../../hooks/useDFPForm.js";

const AddDepartmentFocalPerson = () => {
    const { formData, errors, submitting, handleChange, handleSubmit } = useDFPForm();
    return (
        <DFPForm
            formData={formData}
            errors={errors}
            submitting={submitting}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default AddDepartmentFocalPerson;