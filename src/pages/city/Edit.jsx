import { useParams } from "react-router";
import CityForm from "./CityForm.jsx";
import useCityForm from "../../hooks/useCityForm.js";

const EditCity = () => {
  const { id } = useParams();
  const { city, error, loading, isActive, handleChange, toggleStatus, handleSubmit } =
    useCityForm(id);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <CityForm
      heading="Edit City"
      title={city.title}
      isActive={isActive}
      error={error}
      onChange={handleChange}
      onToggleStatus={toggleStatus}
      onSubmit={handleSubmit}
      mode="edit"
    />
  );
};

export default EditCity;