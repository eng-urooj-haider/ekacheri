import { useEffect, useState } from "react";
import { getCities } from "../api/CityApi.js";
import { getLocation } from "../api/LocationApi.js";
import { save, update } from "../api/LocationApi.js";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const useLocationForm = (id) => {
  const navigate = useNavigate();
  // const [cities, setCities] = useState([]);
  const [location, setLocation] = useState({
    city_id: "",
    location: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});
  const toggleButton = () => {
    setLocation((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };
  const isActive = location.status === 1;
 const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 60 * 1000, // fresh for 1 min — no refetch on quick revisits
    retry: 1,
    select: (response) => response.data.filter((city) => city.status === 1),
  });
  useEffect(() => {
    if (!id) return; // guard: don't fetch on Add
    const fetchLocation = async () => {
      try {
        const response = await getLocation(id);
        console.log(response)
        setLocation(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, [id]);
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: name === "location" ? capitalizeFirstLetter(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!location.location || !location.location.trim()) {
      newErrors.location = "Location name is required";
    }

    if (!location.city_id) {
      newErrors.city_id = "Please select a city";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (id) {
        await update(id, location);
      } else {
        await save(location);
      }
      navigate("/locations");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.log(err);
      }
    }
  };
  return {
    cities,
    toggleButton,
    location,
    isActive,
    handleChange,
    errors,
    handleSubmit,
  };
};

export default useLocationForm;
