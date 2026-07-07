import { useState } from "react";
import { useNavigate } from "react-router";
import { storeCity } from "../../api/CityApi.jsx";
import CityForm from "./CityForm.jsx";

const AddCity = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState({ title: "", status: 1 });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const toggleStatus = () => {
    setCity((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!city.title.trim()) {
      setError("City name is required.");
      return;
    }

    setError("");

    try {
      await storeCity(city);
      navigate("/cities");
    } catch (err) {
      // Surface Laravel validation message if present, otherwise a generic fallback
      const message =
        err.response?.data?.errors?.title?.[0] ??
        err.response?.data?.message ??
        "Something went wrong while saving the city. Please try again.";
      setError(message);
    };

    return (
      <CityForm
        heading="Add City"
        city={city}
        isActive={city.status === 1}
        error={error}
        onChange={handleChange}
        onToggleStatus={toggleStatus}
        onSubmit={submitHandler}
        mode='create'
      />
    );
  };
}
export default AddCity;