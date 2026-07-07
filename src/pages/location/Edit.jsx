import LocationForm from "./LocationForm";
const EditLocation = () => {
  return (
    <LocationForm
      cities={cities}
      handleChange={handleChange}
      isActive={isActive}
      toggleButton={toggleButton}
    />
  );
};

export default EditLocation;
