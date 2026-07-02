import api from "./axios.jsx";

const getCities = async () => {
  try {
    const response = await api.get("/cities");
    console.log('hyhtyutu',response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const storeCity = async (data) => {
  try {
    const response = await api.post("/cities", data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getCities, storeCity };
