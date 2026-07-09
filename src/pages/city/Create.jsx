import CityForm from "./CityForm.jsx";
import useCityForm from "../../hooks/useCityForm.js";

const AddCity = () => {
  const { city, error, isActive, handleChange, toggleStatus, handleSubmit } =
    useCityForm();

  return (
    <CityForm
      heading="Add City"
      title={city.title}
      isActive={isActive}
      error={error}
      onChange={handleChange}
      onToggleStatus={toggleStatus}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
};

export default AddCity;