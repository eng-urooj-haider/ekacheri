import LocationForm from "./LocationForm";
import { useEffect, useState } from "react";
import { getCities } from "../../api/CityApi.js";
import { getLocation } from "../../api/LocationApi.js";
import { useParams } from "react-router";
const EditLocation = () => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState({});
  const {id} = useParams();
  const toggleButton = () => {
    setLocation((pre) => ({ ...pre, status: pre.status === 1 ? 0 : 1 }));
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
    const fetchlocations = async () => {
      try {
        const response = await getLocation(id);
        setLocation(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchlocations();
  }, [id]);
  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };
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
