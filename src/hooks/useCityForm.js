import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCity, storeCity, updateCity } from "../api/CityApi.js";

const useCityForm = (id) => {
  const navigate = useNavigate();
  const [city, setCity] = useState({ title: "", status: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isActive = city.status === 1;

  useEffect(() => {
    if (!id) return; // guard: don't fetch on Add

    const fetchCity = async () => {
      try {
        const response = await getCity(id);
        const data = response.data;
        setCity((prev) => ({
          ...prev,
          title: data.title ?? "",
          status: data.status ?? 1,
        }));
      } catch (err) {
        console.error(err);
        setError("Failed to load city.");
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const toggleStatus = () => {
    setCity((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };

  const validate = () => {
    if (!city.title.trim()) {
      setError("City name is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      if (id) {
        await updateCity(id, city);
      } else {
        await storeCity(city);
      }
      navigate("/cities");
    } catch (err) {
      const message =
        err.response?.data?.errors?.title?.[0] ??
        err.response?.data?.message ??
        "Something went wrong while saving the city. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    city,
    error,
    loading,
    isSubmitting,
    isActive,
    handleChange,
    toggleStatus,
    handleSubmit,
  };
};

export default useCityForm;
