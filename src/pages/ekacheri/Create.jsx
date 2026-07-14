import React, { useEffect, useState } from "react";
import EkacheriForm from "./KacheriForm.jsx";
import { getLatestId } from "../../api/EkacheriApi.js"
import useKacheriForm from "../../hooks/useKacheriForm.js";

export default function Create() {
  const { locations ,dfps} = useKacheriForm();
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await getLatestId();
        setId(response.data + 1);
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    };

    fetchId();
  }, []);

  return (
    <div>
      <EkacheriForm id={id} locations={locations} dfps={dfps} />
    </div>
  );
}
