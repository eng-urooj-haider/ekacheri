import { useEffect, useState } from "react";
import { getCities } from "../api/CityApi.js";
import { getLocation } from "../api/LocationApi.js";
import {save , update} from "../api/LocationApi.js";

const useLocationForm = (id) => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState({
    city: "",
    location: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(!!id);

  const toggleButton = () => {
    setLocation((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }));
  };

  const isActive = location.status === 1;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getCities();
        setCities(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (!id) return; // guard: don't fetch on Add
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const response = await getLocation(id);
        setLocation(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  const handleChange = (e) => {
    setErrors({})
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!location.location || !location.location.trim()) {
      newErrors.location = "Location name is required";
    }

    if (!location.city) {
      newErrors.city = "Please select a city";
    }

    setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop here if invalid
    try {
      if (id) {
        await api.update(id, location); // adjust to your actual API method name
      } else {
        await api.save(location);
      }
    } catch (err) {
      console.log(err);
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
    loading,
  };
};

export default useLocationForm;