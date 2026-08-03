import DFPForm from "./DFPForm.jsx";
import { useParams } from "react-router";

const EditDepartmentFocalPerson = () => {
  return (
    <DFPForm 
        heading="Update DFP"
        btnText="Update Focal Person"
    />
  );
};

export default EditDepartmentFocalPerson;