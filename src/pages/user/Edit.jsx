import UserForm from "./UserForm.jsx";
import { useParams } from "react-router";

const EditUser = () => {
  return (
    <UserForm
      heading="Edit User"
      btnText="Update User"
    />
  );
};

export default EditUser;