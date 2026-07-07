import LocationForm from "./LocationForm";
import useLocationForm from "../../hooks/useLocationForm";
import { useParams } from "react-router";
const AddLocation = () => {
  const { id } = useParams();
  const { cities, handleChange, isActive, toggleButton, errors, handleSubmit ,location} =
    useLocationForm(id);
  return (
    <LocationForm
      cities={cities}
      handleChange={handleChange}
      isActive={isActive}
      toggleButton={toggleButton}
      errors={errors}
      handleSubmit={handleSubmit}
      btnText="Update Location"
      heading="Edit Location"
      location={location}
    />
  );
};

export default AddLocation;
