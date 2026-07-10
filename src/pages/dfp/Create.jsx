import { useNavigate } from "react-router";
import DFPForm from "./DFPForm.jsx";
import useDFPForm from "../../hooks/useDFPForm.js";

const AddDepartmentFocalPerson = () => {
    const navigate = useNavigate();
    const { formData, errors, submitting, handleChange, handleSubmit } = useDFPForm();

    const onSubmit = (e) =>
        handleSubmit(e, () => {
            navigate("/focal-persons");
        });

    return (
        <DFPForm
            formData={formData}
            errors={errors}
            submitting={submitting}
            handleChange={handleChange}
            handleSubmit={onSubmit}
        />
    );
};

export default AddDepartmentFocalPerson;