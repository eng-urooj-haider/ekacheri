import LocationForm from "./LocationForm";
import useLocationForm from "../../hooks/useLocationForm";
const AddLocation = () => {
  const {cities , handleChange , isActive ,toggleButton , errors , handleSubmit} = useLocationForm()
  return (
    <LocationForm
      cities={cities}
      handleChange={handleChange}
      isActive={isActive}
      toggleButton={toggleButton}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddLocation;
